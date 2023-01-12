import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';
import * as utils from './utils/utils';

// Expose public functions by attaching to `global`

global.getSheetsData = publicSheetFunctions.getSheetsData;
global.getListOfPidrozdils = utils.getListOfPidrozdils;
global.getListOfPidrozdilsJSON = utils.getListOfPidrozdilsJSON;
global.getUserData = utils.getUserData;
global.getUser = utils.getUser;
global.addSheet = publicSheetFunctions.addSheet;
global.deleteSheet = publicSheetFunctions.deleteSheet;
global.setActiveSheet = publicSheetFunctions.setActiveSheet;
global.getDataForPidrozdil = publicSheetFunctions.getDataForPidrozdil;
global.getDataForGroup = publicSheetFunctions.getDataForGroup;
global.updateRozklad = publicSheetFunctions.updateRozklad;
global.getOrCrateCalendar = publicSheetFunctions.getOrCrateCalendar;
global.doGet = publicUiFunctions.doGet;
global.saveToServer = utils.saveToServer;
