/*
Copyright 2020 Foundries.IO Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
*/

import createresponse from './response';
import devices from './devices';
import factories from './factories';
import factoryresources from './factory-resources';
import jobserv from './jobserv';
import legacydevicegroups from './legacy-device-groups';
import legacydevices from './legacy-devices';
import projects from './projects';
import updates from './updates';
import remote from './remote';

export const createResponse = createresponse;
export const Devices = devices;
export const Factories = factories;
export const FactoryResources = factoryresources;
export const JobServ = jobserv;
export const LegacyDeviceGroups = legacydevicegroups;
export const LegacyDevices = legacydevices;
export const Projects = projects;
export const Remote = remote;
export const Updates = updates;

export default JobServ;
