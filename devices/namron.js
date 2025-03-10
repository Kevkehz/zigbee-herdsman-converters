const exposes = require('../lib/exposes');
const fz = {...require('../converters/fromZigbee'), legacy: require('../lib/legacy').fromZigbee};
const tz = require('../converters/toZigbee');
const constants = require('../lib/constants');
const reporting = require('../lib/reporting');
const extend = require('../lib/extend');
const ea = exposes.access;
const e = exposes.presets;

module.exports = [
    {
        zigbeeModel: ['3802967'],
        model: '3802967',
        vendor: 'Namron',
        description: 'Led bulb 6w RGBW',
        extend: extend.light_onoff_brightness_colortemp_color({colorTempRange: [153, 555]}),
    },
    {
        zigbeeModel: ['4512700'],
        model: '4512700',
        vendor: 'Namron',
        description: 'ZigBee dimmer 400W',
        extend: extend.light_onoff_brightness({noConfigure: true}),
        configure: async (device, coordinatorEndpoint, logger) => {
            await extend.light_onoff_brightness().configure(device, coordinatorEndpoint, logger);
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
            await reporting.onOff(endpoint);
        },
    },
    {
        zigbeeModel: ['4512733'],
        model: '4512733',
        vendor: 'Namron',
        description: 'ZigBee dimmer 2-pol 400W',
        extend: extend.light_onoff_brightness({noConfigure: true}),
        configure: async (device, coordinatorEndpoint, logger) => {
            await extend.light_onoff_brightness().configure(device, coordinatorEndpoint, logger);
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
            await reporting.onOff(endpoint);
        },
    },
    {
        zigbeeModel: ['4512704'],
        model: '4512704',
        vendor: 'Namron',
        description: 'Zigbee switch 400W',
        extend: extend.switch(),
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1) || device.getEndpoint(3);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff']);
            await reporting.onOff(endpoint);
        },
    },
    {
        zigbeeModel: ['1402755'],
        model: '1402755',
        vendor: 'Namron',
        description: 'ZigBee LED dimmer',
        extend: extend.light_onoff_brightness({noConfigure: true}),
        configure: async (device, coordinatorEndpoint, logger) => {
            await extend.light_onoff_brightness().configure(device, coordinatorEndpoint, logger);
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ['genOnOff', 'genLevelCtrl']);
            await reporting.onOff(endpoint);
        },
    },
    {
        zigbeeModel: ['4512703'],
        model: '4512703',
        vendor: 'Namron',
        description: 'Zigbee 4 channel switch K8 (white)',
        fromZigbee: [fz.command_on, fz.command_off, fz.battery, fz.command_move, fz.command_stop],
        exposes: [e.battery(), e.action([
            'on_l1', 'off_l1', 'brightness_move_up_l1', 'brightness_move_down_l1', 'brightness_stop_l1',
            'on_l2', 'off_l2', 'brightness_move_up_l2', 'brightness_move_down_l2', 'brightness_stop_l2',
            'on_l3', 'off_l3', 'brightness_move_up_l3', 'brightness_move_down_l3', 'brightness_stop_l3',
            'on_l4', 'off_l4', 'brightness_move_up_l4', 'brightness_move_down_l4', 'brightness_stop_l4',
        ])],
        toZigbee: [],
        meta: {multiEndpoint: true},
        endpoint: (device) => {
            return {l1: 1, l2: 2, l3: 3, l4: 4};
        },
    },
    {
        zigbeeModel: ['4512721'],
        model: '4512721',
        vendor: 'Namron',
        description: 'Zigbee 4 channel switch K8 (black)',
        fromZigbee: [fz.command_on, fz.command_off, fz.battery, fz.command_move, fz.command_stop],
        toZigbee: [],
        meta: {multiEndpoint: true},
        exposes: [e.battery(), e.action([
            'on_l1', 'off_l1', 'brightness_move_up_l1', 'brightness_move_down_l1', 'brightness_stop_l1',
            'on_l2', 'off_l2', 'brightness_move_up_l2', 'brightness_move_down_l2', 'brightness_stop_l2',
            'on_l3', 'off_l3', 'brightness_move_up_l3', 'brightness_move_down_l3', 'brightness_stop_l3',
            'on_l4', 'off_l4', 'brightness_move_up_l4', 'brightness_move_down_l4', 'brightness_stop_l4'])],
        endpoint: (device) => {
            return {l1: 1, l2: 2, l3: 3, l4: 4};
        },
    },
    {
        zigbeeModel: ['4512701'],
        model: '4512701',
        vendor: 'Namron',
        description: 'Zigbee 1 channel switch K2',
        fromZigbee: [fz.command_on, fz.command_off, fz.battery, fz.command_move, fz.command_stop],
        exposes: [e.battery(), e.action(['on', 'off', 'brightness_move_up', 'brightness_move_down', 'brightness_stop'])],
        toZigbee: [],
    },
    {
        zigbeeModel: ['4512702'],
        model: '4512702',
        vendor: 'Namron',
        description: 'Zigbee 1 channel switch K4',
        fromZigbee: [fz.command_on, fz.command_off, fz.battery, fz.command_move, fz.command_stop, fz.command_step],
        exposes: [e.battery(), e.action([
            'on', 'off', 'brightness_move_up', 'brightness_move_down', 'brightness_stop', 'brightness_step_up', 'brightness_step_down'])],
        toZigbee: [],
    },
    {
        zigbeeModel: ['4512719'],
        model: '4512719',
        vendor: 'Namron',
        description: 'Zigbee 2 channel switch K4 white',
        fromZigbee: [fz.command_on, fz.command_off, fz.battery, fz.command_move, fz.command_stop],
        meta: {multiEndpoint: true},
        exposes: [e.battery(), e.action(['on_l1', 'off_l1', 'brightness_move_up_l1', 'brightness_move_down_l1', 'brightness_stop_l1',
            'on_l2', 'off_l2', 'brightness_move_up_l2', 'brightness_move_down_l2', 'brightness_stop_l2'])],
        toZigbee: [],
        endpoint: (device) => {
            return {l1: 1, l2: 2};
        },
    },
    {
        zigbeeModel: ['4512726'],
        model: '4512726',
        vendor: 'Namron',
        description: 'Zigbee 4 in 1 dimmer',
        fromZigbee: [fz.battery, fz.command_on, fz.command_off, fz.command_move_to_level, fz.command_move_to_color_temp,
            fz.command_move_to_hue, fz.ignore_genOta],
        toZigbee: [],
        exposes: [e.battery(), e.battery_voltage(),
            e.action(['on', 'off', 'brightness_move_to_level', 'color_temperature_move', 'move_to_hue'])],
        meta: {battery: {dontDividePercentage: true}},
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            const binds = ['genBasic', 'genPowerCfg', 'genIdentify', 'haDiagnostic', 'genOta'];
            await reporting.bind(endpoint, coordinatorEndpoint, binds);
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.batteryVoltage(endpoint);
        },
    },
    {
        zigbeeModel: ['4512729'],
        model: '4512729',
        vendor: 'Namron',
        description: 'Zigbee 2 channel switch K4 white',
        fromZigbee: [fz.command_on, fz.command_off, fz.battery, fz.command_move, fz.command_stop],
        meta: {multiEndpoint: true},
        exposes: [e.battery(), e.action(['on_l1', 'off_l1', 'brightness_move_up_l1', 'brightness_move_down_l1', 'brightness_stop_l1',
            'on_l2', 'off_l2', 'brightness_move_up_l2', 'brightness_move_down_l2', 'brightness_stop_l2'])],
        toZigbee: [],
        endpoint: (device) => {
            return {l1: 1, l2: 2};
        },
    },
    {
        zigbeeModel: ['4512706'],
        model: '4512706',
        vendor: 'Namron',
        description: 'Remote control',
        fromZigbee: [fz.command_on, fz.command_off, fz.command_step, fz.command_step_color_temperature, fz.command_recall,
            fz.command_move_to_color_temp, fz.battery],
        exposes: [e.battery(), e.action(['on', 'off', 'brightness_step_up', 'brightness_step_down', 'color_temperature_step_up',
            'color_temperature_step_down', 'recall_*', 'color_temperature_move'])],
        toZigbee: [],
        meta: {multiEndpoint: true},
        endpoint: (device) => {
            return {l1: 1, l2: 2, l3: 3, l4: 4};
        },
    },
    {
        zigbeeModel: ['4512705'],
        model: '4512705',
        vendor: 'Namron',
        description: 'Zigbee 4 channel remote control',
        fromZigbee: [fz.command_on, fz.command_off, fz.battery, fz.command_move, fz.command_stop, fz.command_recall],
        toZigbee: [],
        exposes: [e.battery(), e.action([
            'on_l1', 'off_l1', 'brightness_move_up_l1', 'brightness_move_down_l1', 'brightness_stop_l1',
            'on_l2', 'off_l2', 'brightness_move_up_l2', 'brightness_move_down_l2', 'brightness_stop_l2',
            'on_l3', 'off_l3', 'brightness_move_up_l3', 'brightness_move_down_l3', 'brightness_stop_l3',
            'on_l4', 'off_l4', 'brightness_move_up_l4', 'brightness_move_down_l4', 'brightness_stop_l4',
            'recall_*'])],
        meta: {multiEndpoint: true},
        endpoint: (device) => {
            return {l1: 1, l2: 2, l3: 3, l4: 4};
        },
    },
    {
        zigbeeModel: ['3802960'],
        model: '3802960',
        vendor: 'Namron',
        description: 'LED 9W DIM E27',
        extend: extend.light_onoff_brightness(),
    },
    {
        zigbeeModel: ['3802961'],
        model: '3802961',
        vendor: 'Namron',
        description: 'LED 9W CCT E27',
        extend: extend.light_onoff_brightness_colortemp({colorTempRange: [153, 370]}),
    },
    {
        zigbeeModel: ['3802962'],
        model: '3802962',
        vendor: 'Namron',
        description: 'LED 9W RGBW E27',
        meta: {turnsOffAtBrightness1: true},
        extend: extend.light_onoff_brightness_colortemp_color(),
    },
    {
        zigbeeModel: ['3802963'],
        model: '3802963',
        vendor: 'Namron',
        description: 'LED 5,3W DIM E14',
        extend: extend.light_onoff_brightness(),
    },
    {
        zigbeeModel: ['3802964'],
        model: '3802964',
        vendor: 'Namron',
        description: 'LED 5,3W CCT E14',
        extend: extend.light_onoff_brightness_colortemp(),
    },
    {
        zigbeeModel: ['3802965'],
        model: '3802965',
        vendor: 'Namron',
        description: 'LED 4,8W DIM GU10',
        extend: extend.light_onoff_brightness(),
    },
    {
        zigbeeModel: ['3802966'],
        model: '3802966',
        vendor: 'Namron',
        description: 'LED 4.8W CCT GU10',
        extend: extend.light_onoff_brightness_colortemp({colorTempRange: [153, 370]}),
    },
    {
        zigbeeModel: ['89665'],
        model: '89665',
        vendor: 'Namron',
        description: 'LED Strip RGB+W (5m) IP20',
        meta: {turnsOffAtBrightness1: true},
        extend: extend.light_onoff_brightness_colortemp_color(),
    },
    {
        zigbeeModel: ['4512737', '4512738'],
        model: '4512737/4512738',
        vendor: 'Namron',
        description: 'Touch termostat',
        fromZigbee: [fz.thermostat, fz.namron_thermostat, fz.metering, fz.electrical_measurement,
            fz.namron_hvac_user_interface],
        toZigbee: [tz.thermostat_occupied_heating_setpoint, tz.thermostat_unoccupied_heating_setpoint, tz.thermostat_occupancy,
            tz.thermostat_local_temperature_calibration, tz.thermostat_local_temperature, tz.thermostat_outdoor_temperature,
            tz.thermostat_system_mode, tz.thermostat_control_sequence_of_operation, tz.thermostat_running_state,
            tz.namron_thermostat_child_lock, tz.namron_thermostat],
        exposes: [
            e.local_temperature(),
            exposes.numeric('outdoor_temperature', ea.STATE_GET).withUnit('°C')
                .withDescription('Current temperature measured from the floor sensor'),
            exposes.climate()
                .withSetpoint('occupied_heating_setpoint', 0, 40, 0.1)
                .withLocalTemperature()
                .withLocalTemperatureCalibration(-3, 3, 0.1)
                .withSystemMode(['off', 'auto', 'heat'])
                .withRunningState(['idle', 'heat']),
            exposes.binary('away_mode', ea.ALL, 'ON', 'OFF')
                .withDescription('Enable/disable away mode'),
            exposes.binary('child_lock', ea.ALL, 'LOCK', 'UNLOCK')
                .withDescription('Enables/disables physical input on the device'),
            e.power(), e.current(), e.voltage(), e.energy(),
            exposes.enum('lcd_brightness', ea.ALL, ['low', 'mid', 'high'])
                .withDescription('OLED brightness when operating the buttons.  Default: Medium.'),
            exposes.enum('button_vibration_level', ea.ALL, ['off', 'low', 'high'])
                .withDescription('Key beep volume and vibration level.  Default: Low.'),
            exposes.enum('floor_sensor_type', ea.ALL, ['10k', '15k', '50k', '100k', '12k'])
                .withDescription('Type of the external floor sensor.  Default: NTC 10K/25.'),
            exposes.enum('sensor', ea.ALL, ['air', 'floor', 'both'])
                .withDescription('The sensor used for heat control.  Default: Room Sensor.'),
            exposes.enum('powerup_status', ea.ALL, ['default', 'last_status'])
                .withDescription('The mode after a power reset.  Default: Previous Mode.'),
            exposes.numeric('floor_sensor_calibration', ea.ALL)
                .withUnit('°C')
                .withValueMin(-3).withValueMax(3).withValueStep(0.1)
                .withDescription('The tempearatue calibration for the exernal floor sensor, between -3 and 3 in 0.1°C.  Default: 0.'),
            exposes.numeric('dry_time', ea.ALL)
                .withUnit('min')
                .withValueMin(5).withValueMax(100)
                .withDescription('The duration of Dry Mode, between 5 and 100 minutes.  Default: 5.'),
            exposes.enum('mode_after_dry', ea.ALL, ['off', 'manual', 'auto', 'away'])
                .withDescription('The mode after Dry Mode.  Default: Auto.'),
            exposes.enum('temperature_display', ea.ALL, ['room', 'floor'])
                .withDescription('The temperature on the display.  Default: Room Temperature.'),
            exposes.numeric('window_open_check', ea.ALL)
                .withUnit('°C')
                .withValueMin(1.5).withValueMax(4).withValueStep(0.5)
                .withDescription('The threshold to detect window open, between 1.5 and 4 in 0.5 °C.  Default: 0 (disabled).'),
            exposes.numeric('hysterersis', ea.ALL)
                .withUnit('°C')
                .withValueMin(0.5).withValueMax(2).withValueStep(0.1)
                .withDescription('Hysteresis setting, between 0.5 and 2 in 0.1 °C.  Default: 0.5.'),
            exposes.enum('display_auto_off_enabled', ea.ALL, ['enabled', 'disabled']),
            exposes.numeric('alarm_airtemp_overvalue', ea.ALL)
                .withUnit('°C')
                .withValueMin(20).withValueMax(60)
                .withDescription('Room temperature alarm threshold, between 20 and 60 in °C.  0 means disabled.  Default: 45.'),
        ],
        configure: async (device, coordinatorEndpoint, logger) => {
            const endpoint = device.getEndpoint(1);
            const binds = [
                'genBasic', 'genIdentify', 'hvacThermostat', 'seMetering', 'haElectricalMeasurement', 'genAlarms',
                'msOccupancySensing', 'genTime', 'hvacUserInterfaceCfg',
            ];
            await reporting.bind(endpoint, coordinatorEndpoint, binds);

            // standard ZCL attributes
            await reporting.thermostatTemperature(endpoint);
            await reporting.thermostatOccupiedHeatingSetpoint(endpoint);
            await reporting.thermostatUnoccupiedHeatingSetpoint(endpoint);
            await reporting.thermostatKeypadLockMode(endpoint);

            await endpoint.configureReporting('hvacThermostat', [{
                attribute: 'ocupancy',
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null,
            }]);

            await endpoint.read('haElectricalMeasurement', ['acVoltageMultiplier', 'acVoltageDivisor', 'acCurrentMultiplier']);
            await endpoint.read('haElectricalMeasurement', ['acCurrentDivisor']);

            await reporting.activePower(endpoint);
            await reporting.rmsCurrent(endpoint, {min: 10, change: 10});
            await reporting.rmsVoltage(endpoint, {min: 10});
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);

            // Custom attributes
            const options = {manufacturerCode: 0x1224};

            // OperateDisplayLcdBrightnesss
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1000, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);
            // ButtonVibrationLevel
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1001, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);
            // FloorSensorType
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1002, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);
            // ControlType
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1003, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);
            // PowerUpStatus
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1004, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);
            // FloorSensorCalibration
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1005, type: 0x28},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: 0}],
            options);
            // DryTime
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1006, type: 0x20},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: 0}],
            options);
            // ModeAfterDry
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1007, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);
            // TemperatureDisplay
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1008, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);
            // WindowOpenCheck
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x1009, type: 0x20},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: 0}],
            options);

            // Hysterersis
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x100A, type: 0x20},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: 0}],
            options);
            // DisplayAutoOffEnable
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x100B, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);

            // AlarmAirTempOverValue
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x2001, type: 0x20},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: 0}],
            options);
            // Away Mode Set
            await endpoint.configureReporting('hvacThermostat', [{
                attribute: {ID: 0x2002, type: 0x30},
                minimumReportInterval: 0,
                maximumReportInterval: constants.repInterval.HOUR,
                reportableChange: null}],
            options);

            // Device does not asks for the time with binding, we need to write time during configure
            const time = Math.round(((new Date()).getTime() - constants.OneJanuary2000) / 1000);
            const values = {time: time};
            endpoint.write('genTime', values);

            // Trigger initial read
            await endpoint.read('hvacThermostat', ['systemMode', 'runningState', 'occupiedHeatingSetpoint']);
            await endpoint.read('hvacThermostat', [0x1000, 0x1001, 0x1002, 0x1003], options);
            await endpoint.read('hvacThermostat', [0x1004, 0x1005, 0x1006, 0x1007], options);
            await endpoint.read('hvacThermostat', [0x1008, 0x1009, 0x100A, 0x100B], options);
            await endpoint.read('hvacThermostat', [0x2001, 0x2002], options);
        },
    },
];
