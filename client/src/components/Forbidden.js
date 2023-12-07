// component to be rendered when access to a route is denied
const Forbidden = () => {
    return (
        <main>
            <div className="wrap">
                <h2>Forbidden</h2>
                <p>Access to this page is denied.</p>
            </div>
        </main>
    );
};

export default Forbidden;