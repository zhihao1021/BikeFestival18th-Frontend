export default interface PartnerData {
    name: string,
    link: string,
    imageURL: string,
    intro?: {
        subtitle: string,
        context: string,
        links: {
            [key: string]: string | undefined,
        }
    } | null
};