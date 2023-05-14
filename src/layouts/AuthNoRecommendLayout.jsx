import AuthorizationLayout from './AuthorizationLayout';
import PropTypes from 'prop-types';
import Footer from './components/Footer';
import Header from './components/Header';

function AuthNoRecommendLayout({ children }) {
  return (
    <AuthorizationLayout>
      <div>
      <Header />
      {children}
      <Footer />
    </div>
    </AuthorizationLayout>
  );
}

AuthNoRecommendLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AuthNoRecommendLayout;