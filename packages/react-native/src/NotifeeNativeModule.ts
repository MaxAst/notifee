/*
 * Copyright (c) 2016-present Invertase Limited
 */

import { getCoreModule, getNativeModule } from './NotifeeNativeModuleRegistry';
import NotifeeJSEventEmitter from './NotifeeJSEventEmitter';
import { EventEmitter, NativeModulesStatic } from 'react-native';
import { NativeModuleConfig } from './types';
import { NotifeeJsonConfig } from '../types/Library';

let notifeeConfigJson: any = null;

export default class NotifeeNativeModule {
  private _nativeModule: NativeModulesStatic | null;
  private readonly _config: NativeModuleConfig;

  public constructor(config: NativeModuleConfig) {
    this._nativeModule = null;
    this._config = Object.assign({}, config);
  }

  public get notifeeConfig(): NotifeeJsonConfig {
    if (notifeeConfigJson) {
      return notifeeConfigJson;
    }
    notifeeConfigJson = JSON.parse(getCoreModule().NOTIFEE_RAW_JSON);
    return notifeeConfigJson;
  }

  public get emitter(): EventEmitter {
    return NotifeeJSEventEmitter;
  }

  public get native(): NativeModulesStatic {
    if (this._nativeModule) {
      return this._nativeModule;
    }

    this._nativeModule = getNativeModule(this._config);
    return this._nativeModule;
  }

  public get core(): NativeModulesStatic {
    return getCoreModule();
  }
}
