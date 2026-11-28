import "../App.css";
export default function landing(){
    return (
        <div className="landingPageContainer">
            <nav>
                <div className="navLeft">
                    <img src="/logo.png" alt="Logo" />
                    <h2>ClearMeet</h2>
                </div>
                <div className="navRight">
                    <p>Join as Guest</p>
                    <p>Register</p>
                    <div role="button">
                        <p>Login</p>
                    </div>
                </div>
            </nav>
            <div className="landingMainContainer">
                <div className="heroLeft">
                    <h1><span style={{color: '#15D8B3'}}>Connect</span> with your Loved Ones Instantly.</h1>
                    <p>Cover a distance by ClearMeet.</p>
                    <button className="landingPrimaryButton" onClick={() => window.location.href = "/auth"}>Create a Meeting</button>
                </div>
                <div className="heroRight">
                    <img src="/mobile.png" alt="" />
                </div>
            </div>
        </div>
    );
}