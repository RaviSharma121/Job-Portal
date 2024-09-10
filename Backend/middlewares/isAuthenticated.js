import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // console.log(req);
        // const token = req.cookies.token;
        // console.log(token);
        // if (!token) {
        //     return res.status(401).json({
        //         message: "User not authenticated",
        //         success: false,
        //     })
                // Extract token from the Authorization header

                const authHeader = req.headers.authorization;
                // console.log(authHeader);
                // if(authHeader==null){
                //     return res.status(401).json({
                //         message: "User not authenticated",
                //         success: false,
                //     });
                // }
                if (!authHeader || !authHeader.startsWith('Bearer ')) {
                    return res.status(401).json({
                        message: "User not authenticated",
                        success: false,
                    });
                }
        
                // Split the token from the Bearer prefix
                const token = authHeader.split(' ')[1];
                // console.log('Received Token:', token);
        
                // Verify the token
                const decode = jwt.verify(token, process.env.SECRET_KEY);
                req.id = decode.userId; // Attach user ID from the token to the request object
                next(); // Proceed to the next middleware or route handler
        
    } catch (error) {
        // Handle token verification errors
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: 'User not authenticated / Login',
                success: false,
            });
        }
        // Log other errors
        console.log(error);
        res.status(500).json({
            message: 'Internal server error',
            success: false,
        });
    }
}
export default isAuthenticated;