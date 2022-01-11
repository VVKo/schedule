import * as publicUiFunctions from './ui';
import * as publicSheetFunctions from './sheets';

// Expose public functions by attaching to `global`

global.getSheetsData = publicSheetFunctions.getSheetsData;
global.getListOfPidrozdils = publicSheetFunctions.getListOfPidrozdils;
global.addSheet = publicSheetFunctions.addSheet;
global.deleteSheet = publicSheetFunctions.deleteSheet;
global.setActiveSheet = publicSheetFunctions.setActiveSheet;
global.getDataForPidrozdil = publicSheetFunctions.getDataForPidrozdil;
global.getDataForGroup = publicSheetFunctions.getDataForGroup;
global.updateRozklad = publicSheetFunctions.updateRozklad;
global.getOrCrateCalendar = publicSheetFunctions.getOrCrateCalendar;
global.doGet = publicUiFunctions.doGet;
