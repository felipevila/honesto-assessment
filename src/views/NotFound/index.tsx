import MainLayout from '../../layouts/MainLayout'
import NoContent from '../../components/NoContent'

const NotFound = () => (
  <MainLayout loggedIn>
    <NoContent
      small="404"
      title="Sorry! The page you are looking for cannot be found. 😢"
      returnHome
    />
  </MainLayout>
)

export default NotFound
