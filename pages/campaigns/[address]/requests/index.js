import React from "react";
import {Button, Table} from "semantic-ui-react";
import Link from "next/link";
import RequestRow from "../../../../components/RequestRow";
import Campaign from "../../../../ethereum/campaign";

const RequestIndex = ({address, requests, requestsCount, approversCount}) => {
    const {Header, Row, HeaderCell, Body} = Table;

    const renderRows = () => {
        return requests.map((request, index) => {
            return <RequestRow
                key={index}
                id={index}
                approversCount={approversCount}
                request={request}
                address={address}
            />
        });
    };

    return (
        <>
            <h3>Requests</h3>
            <Link href={`/campaigns/${address}/requests/new`}>
                <Button primary floated="right" style={{marginBottom: 10}}>Add Request</Button>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {renderRows()}
                </Body>
            </Table>
            <div>Found {requestsCount} requests.</div>
        </>
    );
};

export default RequestIndex;

export async function getServerSideProps({params}) {
    const {address} = params;

    const campaign = Campaign(address);

    const approversCount = await campaign.methods.approversCount().call();
    const requestsCount = Number.parseInt(await campaign.methods.getRequestsCount().call());

    let sanitizedRequests = [];
    if (requestsCount > 0) {
        const requests = await Promise.all(
            Array(requestsCount)
                .fill(undefined)
                .map((element, index) => campaign.methods.requests(index).call())
        );

        sanitizedRequests = requests.map(request => {
            return {
                description: request.description,
                value: request.value.toString(),
                recipient: request.recipient,
                complete: request.complete,
                approvalCount: request.approvalCount.toString(),
            }
        })
    }

    return {
        props: {
            requestsCount: requestsCount.toString(),
            approversCount: approversCount.toString(),
            requests: sanitizedRequests,
            address,
        },
    };
}

