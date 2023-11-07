import Campaign from "../ethereum/campaign";

export const useCampaign = (address) => {
    if (!address || typeof address !== "string") {
        throw new Error(`${address} is not a valid address!`);
    }

    const { methods } = Campaign(address);

    return {
        createRequest: methods.createRequest,
        approveRequest: methods.approveRequest,
        contribute: methods.contribute,
        finalizeRequest: methods.finalizeRequest,
        getSummary: methods.getSummary,
        getApproversCount: methods.approversCount,
        getRequestsCount: methods.requestsCount,
        getRequests: methods.requests,
        approvers: methods.approvers,
        minimumContribution: methods.minimumContribution,
        manager: methods.manager,
    };
};