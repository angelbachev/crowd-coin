import React, {useState} from "react";
import {Button, Form, Input, Message} from "semantic-ui-react";
import {useCampaign} from "../../../../hooks/useCampaign";
import web3 from "../../../../ethereum/web3";
import {useRouter} from "next/router";
import Link from "next/link";

const RequestNew = ({address}) => {
    const router = useRouter();
    const {createRequest} = useCampaign(address);

    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        setErrorMessage('');
        try {
            const accounts = await web3.eth.getAccounts();
            await createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({
                    from: accounts[0],
                    data: web3.eth.abi.encodeFunctionSignature('createRequest(string,uint256,address)'),
                })

            router.push(`/campaigns/${address}/requests`);
        } catch (err) {
            setErrorMessage(err.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Link href={`/campaigns/${address}/requests`}>Back</Link>
            <h1>Create a Request</h1>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input
                        value={description}
                        onChange={event => setDescription(event.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Value in Ether</label>
                    <Input
                        value={value}
                        onChange={event => setValue(event.target.value)}
                    />
                </Form.Field>

                <Form.Field>
                    <label>Recipient</label>
                    <Input
                        value={recipient}
                        onChange={event => setRecipient(event.target.value)}
                    /> </Form.Field>

                <Message error header="Ooops!" content={errorMessage}/>
                <Button primary loading={loading}>Create!</Button>
            </Form>
        </>
    );
};

export default RequestNew;

export async function getServerSideProps({params}) {
    return {
        props: {
            address: params.address,
        },
    };
}