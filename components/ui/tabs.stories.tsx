import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import * as Phosphor from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;

type StoryT = StoryObj<typeof Tabs>;

// ─── Shared styles ──────────────────────────────────────────────────────────

const sectionLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--color-muted-foreground, #888)",
  marginBottom: 12,
  display: "block",
};

const gridWrapperStyle: React.CSSProperties = {
  padding: 32,
  display: "flex",
  flexDirection: "column",
  gap: 48,
};

// ─── All Variants Story ─────────────────────────────────────────────────────

export const AllVariants: StoryT = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => {
    return (
      <div style={gridWrapperStyle}>
        {/* Basic Tabs */}
        <div>
          <span style={sectionLabelStyle}>Basic Tabs</span>
          <Tabs defaultValue="account" className="w-96">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </TabsContent>
            <TabsContent value="password" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Update your password and security settings.
              </p>
            </TabsContent>
            <TabsContent value="settings" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Configure your application settings.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* With Icons */}
        <div>
          <span style={sectionLabelStyle}>With Icons</span>
          <Tabs defaultValue="overview" className="w-96">
            <TabsList>
              <TabsTrigger value="overview">
                <Phosphor.House />
                Overview
              </TabsTrigger>
              <TabsTrigger value="analytics">
                <Phosphor.ChartBar />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports">
                <Phosphor.FileText />
                Reports
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Your dashboard overview and quick stats.
              </p>
            </TabsContent>
            <TabsContent value="analytics" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Detailed analytics and performance metrics.
              </p>
            </TabsContent>
            <TabsContent value="reports" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Generated reports and exports.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Many Tabs */}
        <div>
          <span style={sectionLabelStyle}>Many Tabs</span>
          <Tabs defaultValue="tab1" className="w-full max-w-2xl">
            <TabsList className="w-full">
              <TabsTrigger value="tab1">Tab 1</TabsTrigger>
              <TabsTrigger value="tab2">Tab 2</TabsTrigger>
              <TabsTrigger value="tab3">Tab 3</TabsTrigger>
              <TabsTrigger value="tab4">Tab 4</TabsTrigger>
              <TabsTrigger value="tab5">Tab 5</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="mt-4">
              <p className="text-sm text-muted-foreground">Content for Tab 1</p>
            </TabsContent>
            <TabsContent value="tab2" className="mt-4">
              <p className="text-sm text-muted-foreground">Content for Tab 2</p>
            </TabsContent>
            <TabsContent value="tab3" className="mt-4">
              <p className="text-sm text-muted-foreground">Content for Tab 3</p>
            </TabsContent>
            <TabsContent value="tab4" className="mt-4">
              <p className="text-sm text-muted-foreground">Content for Tab 4</p>
            </TabsContent>
            <TabsContent value="tab5" className="mt-4">
              <p className="text-sm text-muted-foreground">Content for Tab 5</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* With Disabled Tab */}
        <div>
          <span style={sectionLabelStyle}>With Disabled Tab</span>
          <Tabs defaultValue="active" className="w-96">
            <TabsList>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="disabled" disabled>
                Disabled
              </TabsTrigger>
              <TabsTrigger value="another">Another</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-4">
              <p className="text-sm text-muted-foreground">
                This tab is active and accessible.
              </p>
            </TabsContent>
            <TabsContent value="another" className="mt-4">
              <p className="text-sm text-muted-foreground">
                Another accessible tab.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        {/* With Cards */}
        <div>
          <span style={sectionLabelStyle}>With Card Content</span>
          <Tabs defaultValue="profile" className="w-96">
            <TabsList>
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
            <TabsContent value="profile" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Update your profile information and avatar.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Billing Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Manage your subscription and payment methods.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="team" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Invite and manage team members.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  },
};

// ─── Individual Stories ─────────────────────────────────────────────────────

export const Default: StoryT = {
  render: () => {
    return (
      <Tabs defaultValue="account" className="w-80">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <p className="text-sm text-muted-foreground">Account settings here.</p>
        </TabsContent>
        <TabsContent value="password">
          <p className="text-sm text-muted-foreground">
            Password settings here.
          </p>
        </TabsContent>
        <TabsContent value="settings">
          <p className="text-sm text-muted-foreground">Settings here.</p>
        </TabsContent>
      </Tabs>
    );
  },
};

export const WithIcons: StoryT = {
  render: () => {
    return (
      <Tabs defaultValue="overview" className="w-80">
        <TabsList>
          <TabsTrigger value="overview">
            <Phosphor.House />
            Overview
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <Phosphor.ChartBar />
            Analytics
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <p className="text-sm text-muted-foreground">Dashboard overview.</p>
        </TabsContent>
        <TabsContent value="analytics">
          <p className="text-sm text-muted-foreground">Analytics details.</p>
        </TabsContent>
      </Tabs>
    );
  },
};

export const WithDisabled: StoryT = {
  render: () => {
    return (
      <Tabs defaultValue="active" className="w-80">
        <TabsList>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="disabled" disabled>
            Disabled
          </TabsTrigger>
          <TabsTrigger value="another">Another</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <p className="text-sm text-muted-foreground">Active tab content.</p>
        </TabsContent>
        <TabsContent value="another">
          <p className="text-sm text-muted-foreground">Another tab content.</p>
        </TabsContent>
      </Tabs>
    );
  },
};
