import { Status } from "./status"
import { rule } from "./rule"
import { logMaker } from "../utils/log"
import { counter } from "../utils/counter"
import { dom } from "./dom"
import { math } from "./math"
import { animation } from "./animation"

const log = logMaker(true);

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
        // check if all rules were followed //
        currentInputInfo.rule.every(ruleName => {
            const ruleFuncName = this._generateRuleFunctionName(ruleName)
            if (this._ruleFuncExists(ruleFuncName)) {
                passAllRulesFlag = passAllRulesFlag && this._ruleFuncExecute(ruleFuncName)
            } else {
                passAllRulesFlag = false
                log(`Cannot find this function : ${ruleFuncName}`, 'warn')
            }
            return passAllRulesFlag
        })
        // true means all rule passed //
        return passAllRulesFlag
    }

    _checkRulesLog = (currentInputInfo) => {
        const value = counter.next().value
        const tag = currentInputInfo.tag
        log(`===== Counter: [${value}] Input: ${tag} =====`)
    }
    // return function name //
    _generateRuleFunctionName = (ruleFuncName) => {
        return `this.rule.${ruleFuncName}`
    }
    // check if this function exist //
    _ruleFuncExists = (ruleFuncName) => {
        return typeof eval(ruleFuncName) === "function"
    }
    // execute function //
    _ruleFuncExecute = (ruleFuncName) => {
        return eval(ruleFuncName)()
    }

    _run() {
        Status.lastInputShowResult = false
        this._addValue()
        this._showResult()
        this._clearAll()
        this._clearLast()
    }

    _addValue = () => {
        if ( Status.currentInputStatus.isAddValue ) {
            dom.getInputDom().value += Status.currentInputInfo.tag
        }
    }

    _showResult = () => {
        if (Status.currentInputStatus.isShowResult) {
            if (!dom.getInputDom().value.length) return
            const analysisInput = Status.currentInputDomSplitOptmize.join('')
            const calculateResult = math.calculate(analysisInput)

            if (typeof calculateResult === "number") {
                dom.getShowDom().value = analysisInput + '='
                dom.getInputDom().value = calculateResult
                animation.textAreaShowHistory()
            }
            Status.lastInputShowResult = true
        }
    }

    _clearAll = () => {
        if (Status.currentInputStatus.isclearAll) {
            if (dom.getInputDom().value.length) {
                dom.getInputDom().value = ''
                this._calculateShowDomValue()
            } else if (dom.getShowDom().value.length) {
                dom.getShowDom().value = ''
                animation.textAreaHideHistory()
            }
        }
    }

    _calculateShowDomValue = () => {
        const history = dom.getShowDom().value.split('')
        if (history.pop() === '=') {
            dom.getShowDom().value += math.calculate(history.join(''))
        }
    }

    _clearLast = () => {
        if (Status.currentInputStatus.isClearLast) {
            if (dom.getInputDom().value.length) {
                const input = dom.getInputDom().value.split('')
                input.pop()
                dom.getInputDom().value = input.join('')
            }
            if (dom.getShowDom().value.length) {
                this._calculateShowDomValue()
            }
        }
    }
}

const calculator = new Calculator()
export { calculator }