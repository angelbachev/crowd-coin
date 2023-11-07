import {Button, Form, Input, Message} from "semantic-ui-react";
import {useState} from "react";
import {useCampaign} from "../hooks/useCampaign";
import web3 from "../ethereum/web3";
import {useRouter} from "next/router";

const ContributeForm = ({address}) => {
    const router = useRouter();
    const {contribute} = useCampaign(address);

    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            const accounts = await web3.eth.getAccounts();
            await contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether'),
                data: web3.eth.abi.encodeFunctionSignature('contribute()'),
            });

            router.reload();
        } catch (err) {
            setErrorMessage(err.message);
        }

        setLoading(false);
        setValue('');
    };


    return (
        <Form onSubmit={handleSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input
                    value={value}
                    onChange={event => setValue(event.target.value)}
                    label="ether"
                    labelPosition="right"
                />
            </Form.Field>
            <Message error header="Oops!" content={errorMessage}/>
            <Button primary loading={loading}>Contribute</Button>
        </Form>
    );
};
export default ContributeForm;