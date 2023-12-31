import React from "react";
import {Button, Card, Grid} from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";
import Link from "next/link";
import Campaign from "../../../ethereum/campaign";

const CampaignShow = ({summary, address}) => {
    const renderCards = () => {
        const {
            minimumContribution,
            balance,
            requestsCount,
            approversCount,
            manager,
        } = summary;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign can create requests.js to withdraw money.',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least this much wei to become an approver.',
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign.',
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend.',
            },
        ];

        return <Card.Group items={items}/>;
    }

    return (
        <>
            <h3>Campaign Details</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="10">
                        {renderCards()}
                    </Grid.Column>
                    <Grid.Column width="6">
                        <ContributeForm address={address}/>
                    </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                    <Grid.Column>
                        <Link href={`/campaigns/${address}/requests`}>
                            <Button primary>View Requests</Button>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
}

export default CampaignShow;

export async function getServerSideProps({params}) {
    const campaign = Campaign(params.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        props: {
            summary: {
                minimumContribution: summary[0].toString(),
                balance: summary[1].toString(),
                requestsCount: summary[2].toString(),
                approversCount: summary[3].toString(),
                manager: summary[4],
            },
            address: params.address,
        },
    };
}