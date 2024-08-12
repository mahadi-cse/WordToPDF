import React from 'react'

const Footer = () => {
    return (
        <div className='text-center'>
             <hr />
            <footer className="footer footer-center bg-base-300 text-base-content p-4 text-sm">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by ACME Industries Ltd</p>
                </aside>
            </footer>
        </div>
    )
}

export default Footer
