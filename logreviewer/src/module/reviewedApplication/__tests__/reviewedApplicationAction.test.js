import configureStore from 'redux-mock-store';
import reduxThunk from 'redux-thunk';
import axios from 'axios';
import getReviewedApplicationAction from '../reviewedApplicationAction';
import { jsxEmptyExpression } from '@babel/types';

jest.mock('axios');
const middleware = [reduxThunk];
const mockStore = configureStore(middleware);

describe('ReviewedApplicationAction', () => {

    it('should able to dispatch success action', async () => {
        const store = mockStore({});
        axios.get.mockImplementation(() => Promise.resolve({data: [{
                id: '123e4567-e89b-42d3-a456-556642440001',
                name: 'BankingApplication',
                inventoryNo: 100001,
                piiData: true,
                criticalFunction: true,
                financialOperation: true,
                supportContactGroup: 'supportGroup@BankingApplication.com',
                smeEmployee: 'Pracownik_SME1'
            },{
                id: '123e4567-e89b-42d3-a456-556642440002',
                name: 'HRApplication',
                inventoryNo: 100002,
                piiData: true,
                criticalFunction: false,
                financialOperation: false,
                supportContactGroup: 'supportGroup@HRApplication.com',
                smeEmployee: 'Pracownik_SME2'
            }]
        }));

        await store.dispatch(getReviewedApplicationAction());

        const actions = store.getActions();
        expect(actions.length).toEqual(3);
        expect(actions[1]).toEqual({
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
            },{
                id: '123e4567-e89b-42d3-a456-556642440002',
                name: 'HRApplication',
                inventoryNo: 100002,
                piiData: true,
                criticalFunction: false,
                financialOperation: false,
                supportContactGroup: 'supportGroup@HRApplication.com',
                smeEmployee: 'Pracownik_SME2'
            }]
        })
    })
})