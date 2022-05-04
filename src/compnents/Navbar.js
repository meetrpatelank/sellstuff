import React, { useState } from 'react'



export const Navbar = () => {

    return (
        <div>
            <div className="container-fluid">

                <div className='row  py-3 bg-light'>

                    <div className='col-lg-3 d-flex justify-content-center'>
                        <h1>SellIt</h1>
                    </div>
                    <div className='col-lg-3'>
                        <a href="/products">
                            <h1>    View Products</h1>
                        </a>
                    </div>
                    <div className='col-lg-3'>
                        <a href="/add-product">
                            <h1>Add product</h1>
                        </a>
                    </div>
                    <div className='col-lg-3'>
                        <a href="/get-all-requests">
                            <h1>All Request</h1>
                        </a>
                    </div>



                    </div>
                </div>
            </div>
    )
}

