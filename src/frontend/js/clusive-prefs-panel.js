/* global cisl, fluid_3_0_0, DJANGO_STATIC_ROOT */

(function(fluid) {
    'use strict';

    // This removes the tableOfContents and
    // enhanceInputs preferences from the
    // default Infusion starter auxiliary schema
    fluid.defaults('cisl.prefs.auxSchema.starter', {
        gradeNames: ['fluid.prefs.auxSchema.starter'],
        mergePolicy: {
            'auxiliarySchema.tableOfContents': 'replace',
            'auxiliarySchema.enhanceInputs': 'replace'
        },
        auxiliarySchema: {
            tableOfContents: null,
            enhanceInputs: null,
            contrast: {
                classes: {
                    default: 'clusive-theme-default',
                    night: 'clusive-theme-night',
                    sepia: 'clusive-theme-sepia'
                },
                panel: null
            },
            textFont: {
                panel: null
            },
            textSize: {
                panel: null
            },
            lineSpace: {
                panel: null
            }
        }
    });

    // Redefine the existing contrast schema used by the starter
    // to remove
    fluid.defaults('fluid.prefs.schemas.contrast', {
        gradeNames: ['fluid.prefs.schemas'],
        schema: {
            'fluid.prefs.contrast': {
                type: 'string',
                default: 'default',
                enum: ['default', 'night', 'sepia']
            }
        }
    });

    fluid.defaults('cisl.prefs.composite.separatedPanel', {
        gradeNames: ['fluid.prefs.separatedPanel'],
        iframeRenderer: {
            markupProps: {
                src: DJANGO_STATIC_ROOT + 'shared/html/SeparatedPanelPrefsEditorFrame.html'
            }
        }
    });

    fluid.defaults('cisl.prefs.auxSchema.letterSpace', {
        gradeNames: ['fluid.prefs.auxSchema.letterSpace'],
        auxiliarySchema: {
            letterSpace: {
                panel: null
            }
        }
    });

    fluid.defaults('cisl.prefs.modalSettings', {
        gradeNames: ['gpii.binder.bindOnCreate'],
        model: {
            modalSettings: {},
            // Linked to preferences editor preferences
            preferences: null
        },
        mappedValues: {
            modalLineSpacingToPreference: {
                default: 1.2,
                tall: 1.6,
                taller: 2
            },
            preferenceLineSpaceToModal: {
                1.2: 'default',
                1.6: 'tall',
                2: 'taller'
            },
            modalLetterSpacingToPreference: {
                default: 1,
                wide: 1.25,
                wider: 1.5
            },
            preferenceLetterSpaceToModal: {
                1: 'default',
                1.25: 'wide',
                1.5: 'wider'
            }
        },
        invokers: {
            setModalSettingsByPreferences: {
                funcName: 'cisl.prefs.modalSettings.setModalSettingsByPreferences',
                args: ['{that}.model.preferences', '{that}']
            }
        },
        modelListeners: {
            'modalSettings.textSize': {
                funcName: 'cisl.prefs.modalSettings.applyModalSettingToPreference',
                args: ['{change}.value', 'preferences.fluid_prefs_textSize', '{that}'],
                excludeSource: 'init'
            },
            'modalSettings.lineSpacing': {
                funcName: 'cisl.prefs.modalSettings.applyModalSettingToPreference',
                args: ['@expand:cisl.prefs.modalSettings.getMappedValue({change}.value, {that}.options.mappedValues.modalLineSpacingToPreference)', 'preferences.fluid_prefs_lineSpace', '{that}'],
                excludeSource: 'init'
            },
            'modalSettings.letterSpacing': {
                funcName: 'cisl.prefs.modalSettings.applyModalSettingToPreference',
                args: ['@expand:cisl.prefs.modalSettings.getMappedValue({change}.value, {that}.options.mappedValues.modalLetterSpacingToPreference)', 'preferences.fluid_prefs_letterSpace', '{that}'],
                excludeSource: 'init'
            },
            'modalSettings.font': {
                funcName: 'cisl.prefs.modalSettings.applyModalSettingToPreference',
                args: ['{change}.value', 'preferences.fluid_prefs_textFont', '{that}'],
                excludeSource: 'init'
            },
            'modalSettings.color': {
                funcName: 'cisl.prefs.modalSettings.applyModalSettingToPreference',
                args: ['{change}.value', 'preferences.fluid_prefs_contrast', '{that}'],
                excludeSource: 'init'
            },
            'preferences': {
                func: '{that}.setModalSettingsByPreferences',
                includeSource: 'init'
            }
        },
        selectors: {
            textSize: '.cislc-modalSettings-textSize',
            lineSpacing: '.cislc-modalSettings-lineSpacing',
            letterSpacing: '.cislc-modalSettings-letterSpacing',
            font: '.cislc-modalSettings-font',
            color: '.cislc-modalSettings-color',
            reset: '.cislc-modalSettings-reset'
        },
        bindings: {
            textSize: 'modalSettings.textSize',
            lineSpacing: 'modalSettings.lineSpacing',
            letterSpacing: 'modalSettings.letterSpacing',
            font: 'modalSettings.font',
            color: 'modalSettings.color'
        }
    });

    cisl.prefs.modalSettings.getMappedValue = function(changedValue, map) {
        // console.log("getMappedValue", changedValue, map)
        return map[changedValue];
    };

    cisl.prefs.modalSettings.applyModalSettingToPreference = function(changedValue, path, that) {
        // console.log("applyModalSetting", changedValue, path, that);
        that.applier.change(path, changedValue);
    };

    cisl.prefs.modalSettings.setModalSettingsByPreferences = function(preferences, that) {
        console.log('cisl.prefs.modalSettings.setModalSettingsByPreferences', preferences);

        that.applier.change('modalSettings.textSize', fluid.get(preferences, 'fluid_prefs_textSize'));

        that.applier.change('modalSettings.font', fluid.get(preferences, 'fluid_prefs_textFont'));

        that.applier.change('modalSettings.lineSpacing', cisl.prefs.modalSettings.getMappedValue(fluid.get(preferences, 'fluid_prefs_lineSpace'), that.options.mappedValues.preferenceLineSpaceToModal));

        that.applier.change('modalSettings.letterSpacing', cisl.prefs.modalSettings.getMappedValue(fluid.get(preferences, 'fluid_prefs_letterSpace'), that.options.mappedValues.preferenceLetterSpaceToModal));

        that.applier.change('modalSettings.color', fluid.get(preferences, 'fluid_prefs_contrast'));
    };
}(fluid_3_0_0));
