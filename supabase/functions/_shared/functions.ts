export const getBearerToken = (req: any) => {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    return token;
};
