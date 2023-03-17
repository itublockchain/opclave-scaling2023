import EnclaveModule from "./module"

export function getPublicKey(alias: string) {
    return EnclaveModule.getPublicKey(alias)
}

export function generateKeyPair(alias: string) {
    return EnclaveModule.generateKeyPair(alias)
}

export function deleteKeyPair(alias: string) {
    return EnclaveModule.deleteKeyPair(alias)
}

export function signMessage(data: string, alias: string) {
    return EnclaveModule.signMessage(alias, data)
}