import React, { useContext, useState } from 'react';
import {
  Alert,
  ButtonToolbar,
  Container,
  Dropdown,
  Button,
  DropdownButton,
  ButtonGroup,
} from 'react-bootstrap';
import { FaInfo } from 'react-icons/fa';
import {
  NavLink,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from 'react-router-dom';
import {
  Document,
  Font,
  Page,
  PDFDownloadLink,
  StyleSheet,
} from '@react-pdf/renderer';
import { ImFilePdf } from 'react-icons/im';
import RozkladContext from '../../../../context/RozkladContext';
import ScheduleInfoByGroup from './ScheduleInfoByGroup';
import ScheduleSingleGroup from './PDFWorkShop/ScheduleSingleGroup';
import FormClearGroup from '../../Forms/FormClearGroup';
import SheduleWeek2 from './SheduleWeek2';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/modern/theme-material/resources/fonts/roboto/Roboto-Regular.ttf',
    },
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/modern/theme-material/resources/fonts/roboto/Roboto-Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src:
        'https://cdnjs.cloudflare.com/ajax/libs/extjs/6.2.0/modern/theme-material/resources/fonts/roboto/Roboto-Italic.ttf',
      fontStyle: 'italic',
    },
  ],
});
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    fontSize: '10pt',
    paddingTop: '10mm',
    paddingLeft: '10mm',
    paddingRight: '10mm',
    flexDirection: 'column',
  },
  logo: {
    width: 74,
    height: 66,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
const StaffSchedule2 = () => {
  const match = useRouteMatch();
  const { state, setShowModal, setDataForModal, setCurrentGroup } = useContext(RozkladContext);
  const [btnName, setBtnName] = useState('Оберіть групу');
  const [highlightTeacher, setHighlightTeacher] = useState(
    'Підсвітити викладача'
  );

  const changeButtonName = e => {
    const group = e.currentTarget.text
    setBtnName(group);
    setCurrentGroup(group)
  };

  const changeHighliteTeacher = e => {
    setHighlightTeacher(e.currentTarget.innerHTML);
  };

  const { academicloadfond, currentSemester, disciplinefond } = state;

  if (!academicloadfond || !academicloadfond[currentSemester.name]) return null;

  const groups = [
    ...new Set([
      ...academicloadfond[currentSemester.name].data
        .map(r => r[1])
        .join('+')
        .split('+')
        .map(r => r.split('гр')[0]),
    ]),
  ].sort();

  const forPRINT = {};
  disciplinefond[currentSemester.name].data.forEach(r => {
    forPRINT[r[0]] = r[1] === '' ? r[0] : r[1];
  });

  const clearSchedule = e => {
    const { group } = e.currentTarget.dataset;

    setShowModal(true);

    setDataForModal({
      title: `Очищення розкладу`,
      size: 'xl',
      body: {
        func: FormClearGroup,
        data: {
          ...{
            group,
          },
        },
      },
    });
  };

  const Group = () => {
    const params = useParams();
    const { groupID } = params;
    const gr = groups[+groupID];
    const teachers = [
      ...new Set(
        academicloadfond[currentSemester.name].data
          .filter(r => r[1].includes(`${gr}гр`))
          .filter(r => +r[6] - +r[7] !== 0)
          .map(r => r[4])
      ),
    ].sort();

    return (
      <>
        <Container>
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h3 className="h3">{gr}</h3>
            <PDFDownloadLink
              document={
                <Document>
                  <Page
                    size={'A2'}
                    orientation={'landscape'}
                    style={styles.page}
                  >
                    <ScheduleSingleGroup
                      state={state}
                      fond={academicloadfond[currentSemester.name].data}
                      forPRINT={forPRINT}
                    />
                  </Page>
                </Document>
              }
              fileName={`${gr}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  `Генерується документ ${gr}.pdf`
                ) : (
                  <ImFilePdf size={32} />
                )
              }
            </PDFDownloadLink>
            {academicloadfond[currentSemester.name].data
              .filter(r => r[1].includes(`${gr}гр`))
              .filter(r => +r[6] - +r[7] !== 0).length > 0 && (
              <Alert variant="warning">
                <FaInfo /> Є не виставлені заняття
              </Alert>
            )}

            <ButtonToolbar
              aria-label="Toolbar with button groups"
              className="mb-2 mb-md-0"
            >
              <DropdownButton
                id="dropdown-item-button"
                variant={'warning'}
                title={`${highlightTeacher}`}
              >
                {teachers.map(t => (
                  <Dropdown.Item
                    as="button"
                    onClick={changeHighliteTeacher}
                    key={`${t}`}
                  >
                    {t}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </ButtonToolbar>
          </div>
        </Container>
        <SheduleWeek2 wn={'НТ'} group={gr} hlt={highlightTeacher} />
        <SheduleWeek2 wn={'ПТ'} group={gr} hlt={highlightTeacher} />
        <ScheduleInfoByGroup group={gr} />
      </>
    );
  };
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Усі групи</h1>
        <ButtonToolbar
          aria-label="Toolbar with button groups"
          className="mb-2 mb-md-0"
        >
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              {btnName}
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ maxHeight: '250px', overflowY: 'scroll' }}>
              {groups.map((group, idx) => {
                return (
                  <Dropdown.Item as="button" key={`${group}`}>
                    <NavLink
                      to={`${match.url}/${idx}`}
                      onClick={changeButtonName}
                      className={({ isActive }) =>
                        isActive ? 'nav-link active' : 'nav-link'
                      }
                    >
                      {group}
                    </NavLink>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar>
      </div>

      <Switch>
        <Route path={`${match.path}/:groupID`}>
          <Group />
        </Route>
      </Switch>
    </>
  );
};

export default StaffSchedule2;
