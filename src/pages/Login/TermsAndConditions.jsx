
const TermsAndConditions = () => {
    const { currentUser } = useAuth();


    return currentUser ? currentUser.accept_terms_and_conditions ? <Outlet /> : <Navigate to="/" /> : <Navigate to="/" />;
};

export default TermsAndConditions;
