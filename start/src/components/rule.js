import { Status } from "./status"
import { logMaker } from "../utils/log"
import { isEmpty } from "../utils/index"
import { data } from "./data"

const log = logMaker(true)

class Rule {

    canNotUseFirst = () => {
        if (isEmpty(Status.currentInputDomValue)) {
            log(`${this.canNotUseFirst.name} did not passed`)
            return false
        }
        log(`${this.canNotUseFirst.name} passed`)
        return true
    }

    canNotUseWithOperator = () => {
        const input = Status.currentInputDomValue.split('')
        const lastinput = input.pop()
        let checkStatus = true
        data.pureOperatorTag.every(tag => {
            if (tag === lastinput) {
                checkStatus = false
                return false
            }
            return true
        })

        if (checkStatus) {
            log(`${this.canNotUseWithOperator.name} passed`)
            return true
        } else {
            log(`${this.canNotUseWithOperator.name} not passed`)
            return false
        }
    }

    canNotUseWithPointer = () => {
        const input = Status.currentInputDomValue.split('')
        const lastinput = input.pop()
        if (lastinput === '.') {
            log(`${this.canNotUseWithPointer.name} not passed`)
            return false
        } else {
            log(`${this.canNotUseWithPointer.name} passed`)
            return true
        }
    }

    canNotUseAfterResult = () => {
        if (Status.lastInputShowResult) {
            log(`${this.canNotUseAfterResult.name} not passed`)
            return false
        } else {
            log(`${this.canNotUseAfterResult.name} passed`)
            return true
        }
    }
    // not 00 or 3 + 00 //
    firstNotDouble = () => {
        const currentInputTag = Status.currentInputInfo.tag
        const lastInputGroup = Status.currentInputDomSplit.pop()
        // why 0.00 can be entered ? //
        // length of 0.00 is greater than currentInputInfo.tag, so it would pass this rule //
        if (currentInputTag === lastInputGroup) {
            log(`${this.firstNotDouble.name} not passed`)
            return false
        } else {
            log(`${this.firstNotDouble.name} passed`)
            return true
        }
    }

    canNotUseIfTheNumAlreadyHavePointer = () => {
        const lastInputGroup = Status.currentInputDomSplit.pop()
        if ( lastInputGroup?.search(/\./) != -1) {
            log(`${this.canNotUseIfTheNumAlreadyHavePointer.name} did not passed`)
            return false
        }
        log(`${this.canNotUseIfTheNumAlreadyHavePointer.name} passed`)
        return true
    }

}

const rule = new Rule()
export { rule}