//
//  EnclaveModuleErrors.swift
//  ReactNativeWallet
//
//  Created by zetsuboii on 14.03.2023.
//

import Foundation

/// Error to be thrown if something goes wrong with Enclave functions
enum EnclaveError: Error {
    case message(String)
}
