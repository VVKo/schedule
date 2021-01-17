import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import { Button, Card, ListGroup, ListGroupItem, Nav } from "react-bootstrap";
import CardOfLesson from "./CardOfLesson";
import OnClickRozklad from "../helper/OnClickRozklad";
import GCalendar from "./GCalendar";

const CLASSROOMS = {
  "Лаб.": [
    "1к. 43 ауд.",
    "1к. 44 ауд.",
    "1к. 45 ауд.",
    "1к. 46 ауд.",
    "20к. 9 ауд.",
    "20к. 7 ауд."
  ],

  інші: [
    "12к. 12 ауд.",
    "12к. 4 ауд.",
    "12к. 5 ауд.",
    "12к. 6 ауд.",
    "12к. 7 ауд.",
    "12к. 9 ауд.",
    "1к. 40 ауд.",
    "20к. 8 ауд.",
    "20к. 21 ауд.",
    "20к. 24 ауд.",
    "20к. 25 ауд.",
    "20к. 27 ауд.",
    "20к. 29 ауд.",
    "20к. 30 ауд.",
    "20к. 31 ауд.",
    "20к. 33 ауд.",
    "20к. 34 ауд.",
    "20к. 34-А ауд.",
    "20к. 35 ауд.",
    "20к. ММА",
    "20к. 38 ауд.",
    "20к. 41 ауд.",
    "20к. 44 ауд.",
    "20к. 45 ауд.",
    "20к. 48 ауд.",
    "20к. 49 ауд.",
    "20к. 50 ауд.",
    "20к. 51 ауд.",
    "20к. 26 ауд.",
    "20к. 43 ауд."
  ]
};

const GroupRozklad = props => {
  console.log("render GroupRozklad", props);
  console.log("role", props.role);
  const fullDATA = props.fulldata;
  const groupData = fullDATA.filter(r =>
    r[props.gr.length === 3 ? 2 : 5].includes(props.gr)
  );
  const groupList =
    props.gr.length === 3
      ? props.students
          .filter(r => r[0].toString() === props.gr)
          .map((val, indx) => {
            return { id: indx + 1, PIP: val[1], EMAIL: val[2] };
          })
      : [];
  const [showOnClickRozklad, setShowOnClickRozklad] = useState({
    show: false,
    data: {
      day: "",
      para: 0,
      firstweek: [{ name: "foo" }],
      secondweek: [{ name: "boo" }],
      firstweek_maybe: [{ name: "not complete" }],
      secondweek_maybe: [{ name: "not complete" }]
    }
  });

  const handleClose = () => {
    setShowOnClickRozklad(prevState => {
      const rez = { ...prevState };
      rez.show = false;
      return rez;
    });
  };
  const isPrepodFree = (prepod, colNumber) => {
    return (
      fullDATA.filter(
        r => r[5].includes(prepod) && r[colNumber].toString() !== ""
      ).length === 0
    );
  };

  const isGroupFree = (group, colNumber) => {
    return (
      Math.max(
        group.split("+").map(g => {
          return fullDATA.filter(
            r => r[2].includes(g.slice(0, 3)) && r[colNumber].toString() !== ""
          ).length;
        })
      ) === 0
    );
  };

  const getFreeAud = (classroomtype, colNumber) => {
    const start =
      classroomtype === "Лаб." ? CLASSROOMS[classroomtype] : CLASSROOMS.інші;

    const busyAud = [
      ...new Set(
        fullDATA
          .filter(r => r[colNumber].toString() !== "")
          .map(ro => ro[colNumber])
      )
    ];

    const diff = start.filter(x => !busyAud.includes(x));

    return diff.join(",");
  };

  const getPara = idx => {
    return groupData
      .filter(r => r[idx] !== "")
      .map(r => {
        const rez = {};
        rez.row = r[0] + 1;
        rez.col = idx;
        rez.group =
          props.gr.length === 3
            ? r[2].split("+").filter(gr => gr.includes(props.gr))
            : r[2];
        rez.name = r[1];
        rez.type = r[3];
        rez.prepod = r[5];
        rez.aud = r[idx];
        return rez;
      });
  };

  const colNumber = (num, dday, week) => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
    const weeks = ["firstweek", "secondweek"];

    return 9 + 16 * days.indexOf(dday) + 2 * (num - 1) + weeks.indexOf(week);
  };

  const para = numb => {
    return {
      id: numb,
      Mon: (
        <CardOfLesson
          firstweek={getPara(9 + 2 * (numb - 1))}
          secondweek={getPara(9 + 2 * (numb - 1) + 1)}
        />
      ), // day(9 + 2 * (numb - 1)),
      Tue: (
        <CardOfLesson
          firstweek={getPara(25 + 2 * (numb - 1))}
          secondweek={getPara(25 + 2 * (numb - 1) + 1)}
        />
      ), // day(25 + 2 * (numb - 1)),
      Wed: (
        <CardOfLesson
          firstweek={getPara(41 + 2 * (numb - 1))}
          secondweek={getPara(41 + 2 * (numb - 1) + 1)}
        />
      ), // day(41 + 2 * (numb - 1)),
      Thu: (
        <CardOfLesson
          firstweek={getPara(57 + 2 * (numb - 1))}
          secondweek={getPara(57 + 2 * (numb - 1) + 1)}
        />
      ), // day(57 + 2 * (numb - 1)),
      Fri: (
        <CardOfLesson
          firstweek={getPara(73 + 2 * (numb - 1))}
          secondweek={getPara(73 + 2 * (numb - 1) + 1)}
        />
      ) // day(73 + 2 * (numb - 1)),
    };
  };

  const onClickTable = (e, column, columnIndex, row, rowIndex) => {
    setShowOnClickRozklad(prevState => {
      const rez = { ...prevState };
      rez.show = true;
      rez.data = { ...prevState.data };
      rez.data.day = column.text;
      rez.data.firstweek =
        row[column.dataField].props.firstweek.length === 0
          ? [{ name: "Вікно" }]
          : row[column.dataField].props.firstweek;
      rez.data.secondweek =
        row[column.dataField].props.secondweek.length === 0
          ? [{ name: "Вікно" }]
          : row[column.dataField].props.secondweek;
      rez.data.para = row.id;
      const num = row.id;
      const dayy = column.dataField;

      rez.data.firstweek_maybe = groupData
        .filter(
          r =>
            r[7] !== r[8] &&
            isPrepodFree(r[5], colNumber(num, dayy, "firstweek"))
        )
        .filter(ro =>
          props.gr.length === 3
            ? true
            : isGroupFree(ro[2], colNumber(num, dayy, "firstweek"))
        )
        .map(r => {
          const rez = {};
          rez.row = r[0] + 1;
          rez.col = colNumber(num, dayy, "firstweek");
          rez.group =
            props.gr.length === 3
              ? r[2].split("+").filter(gr => gr.includes(props.gr))
              : r[2];
          rez.name = r[1];
          rez.type = r[3];
          rez.prepod = r[5];
          rez.aud = getFreeAud(r[3], colNumber(num, dayy, "firstweek"));
          return rez;
        });

      rez.data.secondweek_maybe = groupData
        .filter(
          r =>
            r[7] !== r[8] &&
            isPrepodFree(r[5], colNumber(num, dayy, "secondweek"))
        )
        .filter(ro =>
          props.gr.length === 3
            ? true
            : isGroupFree(ro[2], colNumber(num, dayy, "secondweek"))
        )
        .map(r => {
          const rez = {};
          rez.row = r[0] + 1;
          rez.col = colNumber(num, dayy, "secondweek");
          rez.group =
            props.gr.length === 3
              ? r[2].split("+").filter(gr => gr.includes(props.gr))
              : r[2];
          rez.name = r[1];
          rez.type = r[3];
          rez.prepod = r[5];
          rez.aud = getFreeAud(r[3], colNumber(num, dayy, "secondweek"));
          return rez;
        });

      return rez;
    });
  };
  const [products, setProducts] = useState([
    para(1),
    para(2),
    para(3),
    para(4),
    para(5),
    para(6),
    para(7),
    para(8)
  ]);

  useEffect(() => {
    setShowOnClickRozklad(showOnClickRozklad);
    setProducts(prevState => {
      return prevState;
    });
  }, [showOnClickRozklad]);
  const columns = [
    {
      dataField: "id",
      text: "#",
      headerStyle: (colum, colIndex) => {
        return { width: "40px", textAlign: "center" };
      },
      style: {
        fontWeight: "bold",
        fontSize: "18px",
        width: "40px"
      }
    },
    {
      dataField: "Mon",
      text: "Понеділок",
      headerAlign: "center",
      align: "center",
      events: {
        onClick: onClickTable
      }
    },
    {
      dataField: "Tue",
      text: "Вівторок",
      headerAlign: "center",
      align: "center",
      events: {
        onClick: onClickTable
      }
    },
    {
      dataField: "Wed",
      text: "Середа",
      headerAlign: "center",
      align: "center",
      events: {
        onClick: onClickTable
      }
    },
    {
      dataField: "Thu",
      text: "Четвер",
      headerAlign: "center",
      align: "center",
      events: {
        onClick: onClickTable
      }
    },
    {
      dataField: "Fri",
      text: "П'ятниця",
      headerAlign: "center",
      align: "center",
      events: {
        onClick: onClickTable
      }
    }
  ];

  const CaptionElement = () => (
    <h3
      style={{
        borderRadius: "0.25em",
        textAlign: "center",
        color: "purple",
        border: "1px solid purple",
        padding: "0.5em"
      }}
    >
      {props.gr}
    </h3>
  );

  useEffect(() => {
    setShowOnClickRozklad(prevState => {
      const rez = { ...prevState };
      rez.show = false;
      return rez;
    });

    setProducts([
      para(1),
      para(2),
      para(3),
      para(4),
      para(5),
      para(6),
      para(7),
      para(8)
    ]);

    console.log("GroupRozklad FULLDATA was changed");
  }, [props.fulldata]);
  useEffect(() => {
    console.log("fififififif");
    setProducts(prevState => {
      return prevState;
    });
  }, [products]);
  return (
    <>
      <CaptionElement />

      <BootstrapTable
        keyField="id"
        data={groupList}
        columns={[
          {
            dataField: "id",
            text: "#",
            headerStyle: (colum, colIndex) => {
              return { width: "40px", textAlign: "center" };
            },
            style: {
              fontWeight: "bold",
              fontSize: "18px",
              width: "40px"
            }
          },
          {
            dataField: "PIP",
            text: "П.І.П",
            headerAlign: "center"
          },
          {
            dataField: "EMAIL",
            text: "Корпоративка",
            headerAlign: "center"
          }
        ]}
        striped
        noDataIndication="Table is Empty"
      />
      <BootstrapTable
        wrapperClasses="responsive"
        keyField="id"
        data={products}
        columns={columns}
        striped
      />

      <GCalendar client={props.gr} />

      {props.role === "Супер адмін" ? (
        <OnClickRozklad
          data={showOnClickRozklad}
          updateData={props.updateData}
          close={handleClose}
          client={props.gr}
        />
      ) : null}
    </>
  );
};

export default GroupRozklad;
