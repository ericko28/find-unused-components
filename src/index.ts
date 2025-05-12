#!/usr/bin/env node

import {getProjectPaths} from "./config";
import {findComponents} from "./scanner/componentFinder";
import {scanUsage} from "./scanner/usageScanner";
import {saveUnusedReport} from "./utils/fileUtils";

const { projectRoot, componentsDir, outputFile } = getProjectPaths();

const components = findComponents(projectRoot, componentsDir);
scanUsage(projectRoot, components);
saveUnusedReport(components, outputFile);
