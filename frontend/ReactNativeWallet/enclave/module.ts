import { NativeModules } from "react-native";

const LINKING_ERROR = "Enclave Module is not linked";

const EnclaveModule = NativeModules.EnclaveModule
  ? NativeModules.EnclaveModule
  : new Proxy(
      {},
      { get() { throw new Error(LINKING_ERROR) } }
    );

export default EnclaveModule;