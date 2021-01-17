export const doGet = () => {
  const htmlServ = HtmlService.createTemplateFromFile("main-page");
  const html = htmlServ.evaluate();
  return html;
};
