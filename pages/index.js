import React from "react";
import factory from "../ethereum/factory";
import {Button, Card} from "semantic-ui-react";
import Link from "next/link";

const CampaignIndex = ({campaigns}) => {
    function renderCampaigns() {
        const items = campaigns.map(address => {
            return {
                header: address,
                description: <Link href={`/campaigns/${address}`}>View Campaign</Link>,
                fluid: true,
            };
        });

        return <Card.Group items={items}/>;
    }

    return (
        <div>
            <h3>Open Campaigns</h3>
            <Link href="/campaigns/new">
                <Button floated="right" content="Create Campaign" icon="add circle" primary/>
            </Link>
            {renderCampaigns()}
        </div>
    );
};

export default CampaignIndex;

export async function getServerSideProps({req}) {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return {
        props: {
            campaigns,
        },
    };
}