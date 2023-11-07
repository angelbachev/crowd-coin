import React from "react";
import {Button, Table} from "semantic-ui-react";
import web3 from "../ethereum/web3";
import {useCampaign} from "../hooks/useCampaign";

const RequestRow = ({id, request, approversCount, address}) => {
    const {Row, Cell} = Table;
    const readyToFinalize = Number.parseInt(request.approvalCount) > Number.parseInt(approversCount) / 2;
    const {approveRequest, finalizeRequest} = useCampaign(address);

    const onApprove = async () => {
        const accounts = await web3.eth.getAccounts();
        await approveRequest(id)
            .send({
                from: accounts[0],
                data: web3.eth.abi.encodeFunctionSignature('approveRequest(uint256)'),
            });
    };

    const onFinalize = async () => {
        const accounts = await web3.eth.getAccounts();
        await finalizeRequest(id)
            .send({
                from: accounts[0],
                data: web3.eth.abi.encodeFunctionSignature('finalizeRequest(uint256)'),
            })
    };

    return (
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount}/{approversCount}</Cell>
            <Cell>
                {request.complete ? null : <Button color="green" basic onClick={onApprove}>Approve</Button>}
            </Cell>
            <Cell>
                {request.complete || !readyToFinalize ? null :
                    <Button color="teal" basic onClick={onFinalize}>Finalize</Button>
                }
            </Cell>
        </Row>
    );
};

export default RequestRow;