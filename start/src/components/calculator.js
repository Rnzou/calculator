import { Status } from "./status"
import { rule } from "./rule"
import { logMaker } from "../utils/log"
import { counter } from "../utils/counter"
import { dom } from "./dom"
import { math } from "./math"
import { animation } from "./animation"

class Calculator {

    constructor() {
        this.rule = rule
    }

    analysisEachTimeInput(currentInputInfo) {
        // check inputs //
        this._prepareData(currentInputInfo)
        // check if it follows rules, if it does, run it //
        this._checkRules(currentInputInfo) && this._run()
    }

    _prepareData(info) {
        Status.generate(info)
    }

    _checkRules(currentInputInfo) {
        // console shows which button was pressed //
        this._checkRulesLog(currentInputInfo)
        let passAllRulesFlag = true
        currentInputInfo.rule.every( ruleName => {
            const ruleFuncName = this._generateRuleFunctionName(ruleName)
            if (this._ruleFuncExists(ruleFuncName)) {
                passAllRulesFlag = passAllRulesFlag && this._ruleFuncExecute(ruleFuncName)
            } else {
                passAllRulesFlag = false
                console.log(`Cannot find this function : ${ruleFuncName}`, 'warn')
            }
            return passAllRulesFlag
        })
        return passAllRulesFlag
    }

    _checkRulesLog = (currentInputInfo) => {
        const value = counter.next().value
        const tag = currentInputInfo.tag
        console.log(`===== Counter: [${value}] Input: ${tag} =====`)
    }

    _generateRuleFunctionName = (ruleFuncName) => {
        return `this.rule.${ruleFuncName}`
    }

    _ruleFuncExists = (ruleFuncName) => {
        return typeof eval(ruleFuncName) === "function"
    }

    _ruleFuncExecute = (ruleFuncName) => {
        return eval(ruleFuncName)()
    }

    _run() {

    }
}

const calculator = new Calculator()
export { calculator }