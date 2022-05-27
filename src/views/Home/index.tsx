import * as React from 'react'
import { Redirect } from 'react-router-dom'
import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import Select from 'react-select'
import styles from './home.module.css'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { UserContext } from '../../context/UserProvider'
import { UserT } from '../../context/types'

const Home = () => {
  const currentUser = React.useContext(AccountContext)
  const accountDispatch = React.useContext(DispatchAccountContext)
  const allUsers = React.useContext(UserContext)
  const [selectedUser, setUserForLogin] = React.useState<UserT | null>()

  if (currentUser != null) {
    return <Redirect to="/share-feedback" />
  }

  return (
    <MainLayout className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.loginBox}>
          <img
            alt="honesto"
            src="data:image/svg+xml,%3Csvg width='77' height='78' viewBox='0 0 77 78' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='4' y='4' width='69' height='70'%3E %3Cpath d='M4 73.1083C4 73.6008 4.3999 74 4.8932 74H23.9054C24.3987 74 24.7986 73.6008 24.7986 73.1083V47.2447C24.7986 46.7522 25.1985 46.3529 25.6918 46.3529H51.3082C51.8015 46.3529 52.2014 46.7522 52.2014 47.2447V73.1083C52.2014 73.6008 52.6013 74 53.0946 74H72.1068C72.6001 74 73 73.6008 73 73.1083V4.89172C73 4.39924 72.6001 4 72.1068 4H53.0946C52.6013 4 52.2014 4.39924 52.2014 4.89172V29.873C52.2014 30.3655 51.8015 30.7647 51.3082 30.7647H25.6918C25.1985 30.7647 24.7986 30.3655 24.7986 29.873V4.89172C24.7986 4.39924 24.3987 4 23.9054 4H4.8932C4.3999 4 4 4.39924 4 4.89172V73.1083Z' fill='url(%23paint0_radial)'/%3E %3C/mask%3E %3Cg mask='url(%23mask0)'%3E %3Cg style='mix-blend-mode:multiply'%3E %3Cellipse cx='11.5921' cy='66.197' rx='71.9029' ry='71.7834' fill='url(%23paint1_linear)'/%3E %3C/g%3E %3Cg style='mix-blend-mode:multiply'%3E %3Cellipse cx='43.0777' cy='26.9616' rx='58.2816' ry='58.1847' fill='url(%23paint2_linear)'/%3E %3C/g%3E %3Cg style='mix-blend-mode:multiply'%3E %3Cellipse cx='69.8737' cy='43.4586' rx='48.6796' ry='48.5987' fill='url(%23paint3_linear)'/%3E %3C/g%3E %3Cg style='mix-blend-mode:multiply'%3E %3Cellipse cx='72.9999' cy='66.1976' rx='39.301' ry='39.2357' fill='url(%23paint4_linear)'/%3E %3C/g%3E %3Cg style='mix-blend-mode:multiply'%3E %3Cellipse cx='2.69824' cy='66.2432' rx='29.0671' ry='29.0371' fill='url(%23paint5_linear)'/%3E %3C/g%3E %3C/g%3E %3Cdefs%3E %3CradialGradient id='paint0_radial' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(38.5 39) rotate(90) scale(32.8538 32.3844)'%3E %3Cstop stop-color='white'/%3E %3Cstop offset='1' stop-color='%23F2F3F4'/%3E %3C/radialGradient%3E %3ClinearGradient id='paint1_linear' x1='11.5921' y1='-5.58643' x2='11.5921' y2='137.98' gradientUnits='userSpaceOnUse'%3E %3Cstop stop-color='%23D5B0F2'/%3E %3Cstop offset='1' stop-color='%23D5B0F2' stop-opacity='0'/%3E %3C/linearGradient%3E %3ClinearGradient id='paint2_linear' x1='43.0777' y1='-31.2231' x2='43.0777' y2='85.1463' gradientUnits='userSpaceOnUse'%3E %3Cstop stop-color='%231DDEBB'/%3E %3Cstop offset='1' stop-color='%231DDEBB' stop-opacity='0'/%3E %3C/linearGradient%3E %3ClinearGradient id='paint3_linear' x1='69.8737' y1='-5.14014' x2='69.8737' y2='92.0573' gradientUnits='userSpaceOnUse'%3E %3Cstop stop-color='%23D5B0F2'/%3E %3Cstop offset='1' stop-color='%23D5B0F2' stop-opacity='0'/%3E %3C/linearGradient%3E %3ClinearGradient id='paint4_linear' x1='72.9999' y1='26.9619' x2='72.9999' y2='105.433' gradientUnits='userSpaceOnUse'%3E %3Cstop stop-color='%23D5B0F2'/%3E %3Cstop offset='1' stop-color='%23D5B0F2' stop-opacity='0'/%3E %3C/linearGradient%3E %3ClinearGradient id='paint5_linear' x1='2.69824' y1='37.2061' x2='2.69824' y2='95.2803' gradientUnits='userSpaceOnUse'%3E %3Cstop stop-color='%23AB61E5'/%3E %3Cstop offset='1' stop-color='%23AB61E5' stop-opacity='0'/%3E %3C/linearGradient%3E %3C/defs%3E %3C/svg%3E"
          />
          <h1 className={styles.heading}>Honesto</h1>
          <div className={styles.loginAs}>
            <label htmlFor="loginNames">Login as:</label>
            <Select<UserT>
              id="loginNames"
              options={allUsers!!}
              getOptionLabel={(user: UserT) => user.name}
              getOptionValue={(user: UserT) => user.id}
              value={selectedUser}
              onChange={setUserForLogin}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                accountDispatch({
                  action: 'login',
                  payload: selectedUser,
                })
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
