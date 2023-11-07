import React, {useState} from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import {useRouter} from "next/router";

const CampaignNew = () => {
    const router = useRouter()

    const [minimumContribution, setMinimumContribution] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            setLoading(true);
            setErrorMessage('');
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(minimumContribution)
                .send({
                    from: accounts[0],
                    data: web3.eth.abi.encodeFunctionSignature('createCampaign(uint256)'),
                });

            router.push('/');
        } catch (err) {
            setErrorMessage(err.message);
        }
    }

    return (
        <>
            <h3>Create a Campaign</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input
                        label="wei"
                        labelPosition="right"
                        value={minimumContribution}
                        onChange={event => setMinimumContribution(event.target.value)}
                    />
                </Form.Field>

                <Message error header="Oops!" content={errorMessage}/>
                <Button loading={loading} primary>Create!</Button>
            </Form>
        </>
    );
};

export default CampaignNew;