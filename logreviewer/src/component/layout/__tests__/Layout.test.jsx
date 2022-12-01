import React from 'react';
import {render} from '@testing-library/react';
import Layout from '../Layout';

describe('Layout',()=>{
    it('should render layout component', ()=>{
        const {getByText} = render(
            <Layout>
                <div>test Layout</div>
            </Layout>
        );

        expect(getByText('test Layout')).toBeInTheDocument()
    })
})