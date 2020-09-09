import React from 'react';
import { MDBContainer as Container, MDBTypography as Typography } from 'mdbreact';
import { Helmet } from 'react-helmet';


export default class Handle404 extends React.Component {
    render() {
        return (
            <Container className='my-5 py-5 text-center'>
                <Helmet>
                    <title>404 Not Found | UP Computerized Registration System</title>
                </Helmet>
                <Typography tag='h1' variant='display-4' className="text-monospace">
                    404
                </Typography>
                <Typography tag='h1' variant='h4-responsive'>
                    The requested URL was not found on this server.
                </Typography>
            </Container>
        );
    }
}
