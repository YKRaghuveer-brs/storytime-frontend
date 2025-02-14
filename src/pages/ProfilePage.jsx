import Tabs, {Tab} from "react-best-tabs"
import "react-best-tabs/dist/index.css"
import Account from "../components/user/Account"
import Preference from "../components/user/Preference"
import UpdatePassword from "../components/user/UpdatePassword"

const ProfilePage = () => {
  return (
    <div>
      <div className="mx-16">
        <Tabs
          activeTab="1"
          className="mt-6"
          activityClassName="bg-success"
        >
          <Tab
            title="Account"
            class="text-base text-white font-semibold tracking-tight border-b pb-2"
          >
            <br />
            <Account />
          </Tab>
          <Tab
            title="Preferences"
            class="text-base text-white font-semibold tracking-tight border-b pb-2"
          >
            <br />
            <Preference />
          </Tab>
          <Tab
            title="Update Password"
            class="text-base text-white font-semibold tracking-tight border-b pb-2"
          >
            <br />
            <UpdatePassword />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default ProfilePage