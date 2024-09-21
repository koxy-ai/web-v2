export const tiers = {
    owner: 100,
    admin: 50,
    developer: 10,
}

export const getTier = (tier: string) => {
    return tiers[tier.toLowerCase() as keyof typeof tiers];
}

export const canManage = (tier: string, otherTier: string) => {
    const first = tiers[tier.toLowerCase() as keyof typeof tiers];
    const second = tiers[otherTier.toLowerCase() as keyof typeof tiers];

    return first > second;
}