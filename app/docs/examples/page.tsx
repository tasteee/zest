"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Terminal, AlertCircle, CheckCircle, Info, AlertTriangle, Bell, User, Settings, CreditCard, LogOut, Mail, Plus, Search, Loader2, Heart, Star, Send, ChevronDown } from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground mb-2">{title}</h2>
      {description && <p className="text-muted-foreground">{description}</p>}
    </div>
  );
}

function ExampleCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">{title}</h3>
      <div className="flex flex-wrap items-start gap-4">
        {children}
      </div>
    </div>
  );
}

export default function ExamplesPage() {
  const [switchStates, setSwitchStates] = useState({
    airplane: false,
    notifications: true,
    darkMode: false,
  });

  const [checkboxStates, setCheckboxStates] = useState({
    terms: false,
    newsletter: true,
    updates: false,
  });

  return (
    <TooltipProvider>
      <div className="space-y-16 pb-16">
        {/* Page Header */}
        <div className="space-y-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">Examples</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            Component Examples
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            A comprehensive showcase of all Zest components with their common variations. 
            Use this page as a reference for available styles, states, and configurations.
          </p>
        </div>

        {/* Buttons Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZButton" 
            description="Buttons with different kinds, themes, and sizes."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Solid Buttons">
              <Button kind="solid" theme="green">Green</Button>
              <Button kind="solid" theme="purple">Purple</Button>
              <Button kind="solid" theme="pink">Pink</Button>
              <Button kind="solid" theme="orange">Orange</Button>
              <Button kind="solid" theme="white">White</Button>
            </ExampleCard>

            <ExampleCard title="Outlined Buttons">
              <Button kind="outlined" theme="green">Green</Button>
              <Button kind="outlined" theme="purple">Purple</Button>
              <Button kind="outlined" theme="pink">Pink</Button>
              <Button kind="outlined" theme="orange">Orange</Button>
              <Button kind="outlined" theme="white">White</Button>
            </ExampleCard>

            <ExampleCard title="Ghost Buttons">
              <Button kind="ghost" theme="green">Green</Button>
              <Button kind="ghost" theme="purple">Purple</Button>
              <Button kind="ghost" theme="pink">Pink</Button>
              <Button kind="ghost" theme="orange">Orange</Button>
              <Button kind="ghost" theme="white">White</Button>
            </ExampleCard>

            <ExampleCard title="Button Sizes">
              <Button kind="solid" theme="green" size="xs">Extra Small</Button>
              <Button kind="solid" theme="green" size="sm">Small</Button>
              <Button kind="solid" theme="green" size="md">Medium</Button>
              <Button kind="solid" theme="green" size="lg">Large</Button>
              <Button kind="solid" theme="green" size="xl">Extra Large</Button>
            </ExampleCard>

            <ExampleCard title="Button States">
              <Button kind="solid" theme="green">Default</Button>
              <Button kind="solid" theme="green" isDisabled>Disabled</Button>
              <Button kind="solid" theme="purple">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading
              </Button>
              <Button kind="outlined" theme="pink">
                <Heart className="h-4 w-4" />
                With Icon
              </Button>
              <Button kind="solid" theme="orange">
                Submit
                <Send className="h-4 w-4" />
              </Button>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Badge Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZBadge" 
            description="Small status indicators and labels."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Solid Badges">
              <Badge variant="default">Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="green">Green</Badge>
              <Badge variant="purple">Purple</Badge>
              <Badge variant="pink">Pink</Badge>
              <Badge variant="orange">Orange</Badge>
            </ExampleCard>

            <ExampleCard title="Outlined Badges">
              <Badge variant="outline">Outline</Badge>
              <Badge variant="green-outline">Green</Badge>
              <Badge variant="purple-outline">Purple</Badge>
              <Badge variant="pink-outline">Pink</Badge>
              <Badge variant="orange-outline">Orange</Badge>
            </ExampleCard>

            <ExampleCard title="Badges with Icons">
              <Badge variant="green"><CheckCircle className="h-3 w-3" /> Success</Badge>
              <Badge variant="destructive"><AlertCircle className="h-3 w-3" /> Error</Badge>
              <Badge variant="orange"><AlertTriangle className="h-3 w-3" /> Warning</Badge>
              <Badge variant="purple"><Info className="h-3 w-3" /> Info</Badge>
              <Badge variant="pink"><Star className="h-3 w-3" /> Featured</Badge>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Input Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZInput" 
            description="Text inputs with different focus colors and states."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Focus Colors">
              <div className="grid gap-4 w-full max-w-md">
                <div className="space-y-2">
                  <Label>Default Focus</Label>
                  <Input placeholder="Default focus ring" focusColor="default" />
                </div>
                <div className="space-y-2">
                  <Label>Green Focus</Label>
                  <Input placeholder="Green focus ring" focusColor="green" />
                </div>
                <div className="space-y-2">
                  <Label>Purple Focus</Label>
                  <Input placeholder="Purple focus ring" focusColor="purple" />
                </div>
                <div className="space-y-2">
                  <Label>Pink Focus</Label>
                  <Input placeholder="Pink focus ring" focusColor="pink" />
                </div>
                <div className="space-y-2">
                  <Label>Orange Focus</Label>
                  <Input placeholder="Orange focus ring" focusColor="orange" />
                </div>
              </div>
            </ExampleCard>

            <ExampleCard title="Input Types">
              <div className="grid gap-4 w-full max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="text">Text</Label>
                  <Input id="text" type="text" placeholder="Enter text" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="name@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <Input id="search" type="search" placeholder="Search..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="disabled">Disabled</Label>
                  <Input id="disabled" placeholder="Disabled input" disabled />
                </div>
              </div>
            </ExampleCard>

            <ExampleCard title="Input with Icons">
              <div className="grid gap-4 w-full max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" placeholder="Search..." />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input className="pl-9" type="email" placeholder="Email address" />
                </div>
              </div>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Checkbox & Switch Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZCheckbox & ZSwitch" 
            description="Toggle controls for boolean values."
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            <ExampleCard title="Checkboxes">
              <div className="space-y-4 w-full">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={checkboxStates.terms}
                    onCheckedChange={(checked) => setCheckboxStates(prev => ({ ...prev, terms: checked as boolean }))}
                  />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="newsletter" 
                    checked={checkboxStates.newsletter}
                    onCheckedChange={(checked) => setCheckboxStates(prev => ({ ...prev, newsletter: checked as boolean }))}
                  />
                  <Label htmlFor="newsletter">Subscribe to newsletter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled" disabled />
                  <Label htmlFor="disabled" className="text-muted-foreground">Disabled checkbox</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="checked-disabled" checked disabled />
                  <Label htmlFor="checked-disabled" className="text-muted-foreground">Checked disabled</Label>
                </div>
              </div>
            </ExampleCard>

            <ExampleCard title="Switches">
              <div className="space-y-4 w-full">
                <div className="flex items-center justify-between">
                  <Label htmlFor="airplane">Airplane Mode</Label>
                  <Switch 
                    id="airplane" 
                    checked={switchStates.airplane}
                    onCheckedChange={(checked) => setSwitchStates(prev => ({ ...prev, airplane: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="notifications">Notifications</Label>
                  <Switch 
                    id="notifications" 
                    checked={switchStates.notifications}
                    onCheckedChange={(checked) => setSwitchStates(prev => ({ ...prev, notifications: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <Switch 
                    id="dark-mode" 
                    checked={switchStates.darkMode}
                    onCheckedChange={(checked) => setSwitchStates(prev => ({ ...prev, darkMode: checked }))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="disabled-switch" className="text-muted-foreground">Disabled</Label>
                  <Switch id="disabled-switch" disabled />
                </div>
              </div>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Select Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZSelect" 
            description="Dropdown selection controls."
          />
          
          <div className="grid gap-6 md:grid-cols-2">
            <ExampleCard title="Basic Select">
              <div className="space-y-2 w-full max-w-xs">
                <Label>Choose a theme</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ExampleCard>

            <ExampleCard title="Select with Groups">
              <div className="space-y-2 w-full max-w-xs">
                <Label>Select a fruit</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Pick a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                    <SelectItem value="grape">Grape</SelectItem>
                    <SelectItem value="mango">Mango</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Alert Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZAlert" 
            description="Contextual feedback messages."
          />
          
          <div className="grid gap-4">
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert with neutral styling.
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Please review your information before proceeding.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was an error processing your request.
              </AlertDescription>
            </Alert>

            <Alert variant="info">
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Here is some helpful information for you.
              </AlertDescription>
            </Alert>

            <Alert variant="accent">
              <Bell className="h-4 w-4" />
              <AlertTitle>New Feature</AlertTitle>
              <AlertDescription>
                Check out our latest feature update!
              </AlertDescription>
            </Alert>
          </div>
        </section>

        <Separator />

        {/* Progress Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZProgress" 
            description="Progress indicators with different colors."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Progress Variants">
              <div className="space-y-6 w-full max-w-md">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Default</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                  <Progress value={75} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neon-green">Green</span>
                    <span className="text-neon-green">60%</span>
                  </div>
                  <Progress value={60} variant="green" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neon-purple">Purple</span>
                    <span className="text-neon-purple">45%</span>
                  </div>
                  <Progress value={45} variant="purple" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neon-pink">Pink</span>
                    <span className="text-neon-pink">90%</span>
                  </div>
                  <Progress value={90} variant="pink" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neon-orange">Orange</span>
                    <span className="text-neon-orange">30%</span>
                  </div>
                  <Progress value={30} variant="orange" />
                </div>
              </div>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Avatar Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZAvatar" 
            description="User profile images with fallback support."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Avatar Sizes">
              <Avatar className="h-8 w-8">
                <AvatarFallback>XS</AvatarFallback>
              </Avatar>
              <Avatar className="h-10 w-10">
                <AvatarFallback>SM</AvatarFallback>
              </Avatar>
              <Avatar className="h-12 w-12">
                <AvatarFallback>MD</AvatarFallback>
              </Avatar>
              <Avatar className="h-16 w-16">
                <AvatarFallback>LG</AvatarFallback>
              </Avatar>
              <Avatar className="h-20 w-20">
                <AvatarFallback>XL</AvatarFallback>
              </Avatar>
            </ExampleCard>

            <ExampleCard title="Avatar with Fallbacks">
              <Avatar>
                <AvatarImage src="/placeholder-user.jpg" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-neon-green text-primary-foreground">AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-neon-purple text-primary-foreground">CD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-neon-pink text-primary-foreground">EF</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-neon-orange text-primary-foreground">GH</AvatarFallback>
              </Avatar>
            </ExampleCard>

            <ExampleCard title="Avatar Group">
              <div className="flex -space-x-3">
                <Avatar className="border-2 border-background">
                  <AvatarFallback className="bg-neon-green text-primary-foreground">A</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-background">
                  <AvatarFallback className="bg-neon-purple text-primary-foreground">B</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-background">
                  <AvatarFallback className="bg-neon-pink text-primary-foreground">C</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-background">
                  <AvatarFallback className="bg-muted text-muted-foreground">+5</AvatarFallback>
                </Avatar>
              </div>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Skeleton Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZSkeleton" 
            description="Loading placeholders for content."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Basic Skeletons">
              <div className="space-y-4 w-full max-w-md">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </ExampleCard>

            <ExampleCard title="Card Skeleton">
              <div className="flex items-center space-x-4 w-full max-w-sm">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </ExampleCard>

            <ExampleCard title="Content Skeleton">
              <div className="space-y-4 w-full max-w-lg">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="flex gap-2 pt-2">
                  <Skeleton className="h-10 w-24" />
                  <Skeleton className="h-10 w-24" />
                </div>
              </div>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Card Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZCard" 
            description="Flexible container components."
          />
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Basic Card</CardTitle>
                <CardDescription>A simple card with header and content.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  This is the card content area where you can place any content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Card with Footer</CardTitle>
                <CardDescription>Includes action buttons in footer.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Cards can have footers for actions.
                </p>
              </CardContent>
              <CardFooter className="gap-2">
                <Button kind="outlined" theme="white" size="sm">Cancel</Button>
                <Button kind="solid" theme="green" size="sm">Save</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interactive Card</CardTitle>
                <CardDescription>With form elements inside.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="card-input">Email</Label>
                  <Input id="card-input" placeholder="name@example.com" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="card-checkbox" />
                  <Label htmlFor="card-checkbox">Remember me</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button kind="solid" theme="purple" size="sm" className="w-full">Submit</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <Separator />

        {/* Tabs Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZTabs" 
            description="Tabbed content navigation."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Default Tabs">
              <Tabs defaultValue="account" className="w-full max-w-lg">
                <TabsList>
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account</CardTitle>
                      <CardDescription>Manage your account settings.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" defaultValue="@johndoe" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="password" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Password</CardTitle>
                      <CardDescription>Change your password here.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current">Current Password</Label>
                        <Input id="current" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new">New Password</Label>
                        <Input id="new" type="password" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="settings" className="mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Settings</CardTitle>
                      <CardDescription>Configure your preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tab-notifications">Email Notifications</Label>
                        <Switch id="tab-notifications" />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="tab-marketing">Marketing Emails</Label>
                        <Switch id="tab-marketing" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Accordion Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZAccordion" 
            description="Collapsible content panels."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Default Accordion">
              <Accordion type="single" collapsible className="w-full max-w-lg">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Is it accessible?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern for accordions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is it styled?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It comes with default styles that match your design system, 
                    following the Zest design language with proper spacing and colors.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is it animated?</AccordionTrigger>
                  <AccordionContent>
                    Yes. It&apos;s animated by default with smooth open/close transitions, 
                    but you can disable animations if needed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Dialog Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZDialog" 
            description="Modal dialogs for focused interactions."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Dialog Examples">
              <Dialog>
                <DialogTrigger asChild>
                  <Button kind="outlined" theme="white">Open Dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="dialog-name">Name</Label>
                      <Input id="dialog-name" defaultValue="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dialog-email">Email</Label>
                      <Input id="dialog-email" defaultValue="john@example.com" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button kind="outlined" theme="white">Cancel</Button>
                    <Button kind="solid" theme="green">Save Changes</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button kind="solid" theme="pink">Confirm Action</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Are you sure?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. This will permanently delete your data.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button kind="outlined" theme="white">Cancel</Button>
                    <Button kind="solid" theme="pink">Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Dropdown Menu Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZDropdownMenu" 
            description="Contextual menus with actions."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Dropdown Examples">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button kind="outlined" theme="white">
                    Open Menu
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button kind="solid" theme="purple">
                    <Plus className="h-4 w-4" />
                    Create New
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>New Project</DropdownMenuItem>
                  <DropdownMenuItem>New Team</DropdownMenuItem>
                  <DropdownMenuItem>New Document</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Import</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Tooltip Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZTooltip" 
            description="Contextual information on hover."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Tooltip Positions">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button kind="outlined" theme="white">Hover me (Top)</Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Tooltip on top</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button kind="outlined" theme="green">Hover me (Right)</Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Tooltip on right</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button kind="outlined" theme="purple">Hover me (Bottom)</Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Tooltip on bottom</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button kind="outlined" theme="pink">Hover me (Left)</Button>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Tooltip on left</p>
                </TooltipContent>
              </Tooltip>
            </ExampleCard>
          </div>
        </section>

        <Separator />

        {/* Table Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZTable" 
            description="Data tables with proper styling."
          />
          
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell><Badge variant="green">Paid</Badge></TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV002</TableCell>
                  <TableCell><Badge variant="orange">Pending</Badge></TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$150.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV003</TableCell>
                  <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
                  <TableCell>Bank Transfer</TableCell>
                  <TableCell className="text-right">$350.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV004</TableCell>
                  <TableCell><Badge variant="green">Paid</Badge></TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$450.00</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">INV005</TableCell>
                  <TableCell><Badge variant="purple-outline">Processing</Badge></TableCell>
                  <TableCell>PayPal</TableCell>
                  <TableCell className="text-right">$550.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        <Separator />

        {/* Separator Section */}
        <section className="space-y-6">
          <SectionHeader 
            title="ZSeparator" 
            description="Visual dividers between content."
          />
          
          <div className="grid gap-6">
            <ExampleCard title="Horizontal Separator">
              <div className="w-full max-w-md space-y-4">
                <div>
                  <h4 className="text-sm font-medium">Section One</h4>
                  <p className="text-sm text-muted-foreground">Content for the first section.</p>
                </div>
                <Separator />
                <div>
                  <h4 className="text-sm font-medium">Section Two</h4>
                  <p className="text-sm text-muted-foreground">Content for the second section.</p>
                </div>
              </div>
            </ExampleCard>

            <ExampleCard title="Vertical Separator">
              <div className="flex h-8 items-center space-x-4 text-sm">
                <div>Blog</div>
                <Separator orientation="vertical" />
                <div>Docs</div>
                <Separator orientation="vertical" />
                <div>Source</div>
                <Separator orientation="vertical" />
                <div>Support</div>
              </div>
            </ExampleCard>
          </div>
        </section>
      </div>
    </TooltipProvider>
  );
}
