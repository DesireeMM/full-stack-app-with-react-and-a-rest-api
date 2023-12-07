// component to be rendered when access to a route is denied
const Forbidden = () => {
    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Access to this page is denied.</p>
        </div>
    );
};

export default Forbidden;