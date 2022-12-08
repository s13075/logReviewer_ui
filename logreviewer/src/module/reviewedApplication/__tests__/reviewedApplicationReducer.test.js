import reviewedApplicationReducer, { INITIAL_REVIEWED_APPLICATIONS_REDUCER_STATE } from '../reviewedApplicationReducer';

describe('reviewedApplicationReducer', () => {
    it('should return correct updated state', () => {
        const action = {
            type: 'REVEIWEDAPPLICATIONSLIST',
            payload: [{
                id: '123e4567-e89b-42d3-a456-556642440001',
                name: 'BankingApplication',
                inventoryNo: 100001,
                piiData: true,
                criticalFunction: true,
                financialOperation: true,
                supportContactGroup: 'supportGroup@BankingApplication.com',
                smeEmployee: 'Pracownik_SME1'
            }]
        }

        const newState = reviewedApplicationReducer(INITIAL_REVIEWED_APPLICATIONS_REDUCER_STATE, action);

        expect(newState).toEqual({
            reviewedApplications: [{
                id: '123e4567-e89b-42d3-a456-556642440001',
                name: 'BankingApplication',
                inventoryNo: 100001,
                piiData: true,
                criticalFunction: true,
                financialOperation: true,
                supportContactGroup: 'supportGroup@BankingApplication.com',
                smeEmployee: 'Pracownik_SME1'
            }]
        })
    })
})