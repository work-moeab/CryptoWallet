//////// For react native contact type error
// $ yarn ts:check
// node_modules/react-native-contacts/index.ts:5:30 - error TS2304: Cannot find name 'global'.

// 5 const isTurboModuleEnabled = global.__turboModuleProxy != null;
//                                ~~~~~~

// Found 1 error in node_modules/react-native-contacts/index.ts:5

declare const global: typeof globalThis

//Also added this to tsconfig
// "src/types/global.d.ts",

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_ENV: string
  }
}

declare const process: {
  env: NodeJS.ProcessEnv
}

// src/types/global.d.ts

declare module '*.png' {
  const value: number // React Native's require() returns a number
  export default value
}

declare module '*.jpg' {
  const value: number
  export default value
}

declare module '*.svg' {
  import * as React from 'react'
  import { SvgProps } from 'react-native-svg'
  const content: React.FC<SvgProps>
  export default content
}
declare module '*.jpeg' {
  const value: number
  export default value
}
