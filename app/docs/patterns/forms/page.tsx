'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { ZButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, AlertCircle } from 'lucide-react'

export default function FormsPatternPage() {
	return (
		<div className='space-y-16'>
			{/* Breadcrumb */}
			<div className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/patterns' className='hover:text-foreground transition-colors'>
					Patterns
				</Link>
				<ChevronRight className='h-4 w-4' />
				<span className='text-foreground'>Forms</span>
			</div>

			{/* Header */}
			<div className='space-y-4'>
				<div className='flex items-center gap-3'>
					<h1 className='text-4xl font-bold tracking-tight text-foreground'>Form Patterns</h1>
					<Badge kind='ghost' color='white'>Pattern</Badge>
				</div>
				<p className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Best practices for building accessible, user-friendly forms with proper validation, error handling, and layout
					patterns.
				</p>
			</div>

			{/* Basic Form */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Basic Form Layout</h2>
				<p className='text-muted-foreground'>A standard form with labeled inputs and a submit button.</p>
				<ComponentPreview
					title='Contact Form'
					description='A simple contact form with name, email, and message fields.'
					code={`<form className="space-y-6 max-w-md">
  <div className="space-y-2">
    <Label htmlFor="name">Name</Label>
    <Input id="name" placeholder="Enter your name" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="Enter your email" />
  </div>
  <div className="space-y-2">
    <Label htmlFor="message">Message</Label>
    <Input id="message" placeholder="Enter your message" />
  </div>
  <Button type="submit" className="w-full">Send Message</Button>
</form>`}
				>
					<form className='space-y-6 max-w-md w-full'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Name</Label>
							<Input id='name' placeholder='Enter your name' />
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input id='email' type='email' placeholder='Enter your email' />
						</div>
						<div className='space-y-2'>
							<Label htmlFor='message'>Message</Label>
							<Input id='message' placeholder='Enter your message' />
						</div>
						<ZButton type='submit' className='w-full'>
							Send Message
						</ZButton>
					</form>
				</ComponentPreview>
			</section>

			{/* Form in Card */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Form in Card</h2>
				<p className='text-muted-foreground'>Wrapping forms in cards provides visual separation and structure.</p>
				<ComponentPreview
					title='Login Form'
					description='A login form wrapped in a card component.'
					code={`<Card className="w-full max-w-sm">
  <CardHeader>
    <CardTitle>Login</CardTitle>
    <CardDescription>
      Enter your email below to login to your account.
    </CardDescription>
  </CardHeader>
  <CardContent>
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input id="login-email" type="email" placeholder="m@example.com" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="login-password">Password</Label>
        <Input id="login-password" type="password" />
      </div>
    </form>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Sign In</Button>
  </CardFooter>
</Card>`}
				>
					<Card className='w-full max-w-sm'>
						<CardHeader>
							<CardTitle>Login</CardTitle>
							<CardDescription>Enter your email below to login to your account.</CardDescription>
						</CardHeader>
						<CardContent>
							<form className='space-y-4'>
								<div className='space-y-2'>
									<Label htmlFor='login-email'>Email</Label>
									<Input id='login-email' type='email' placeholder='m@example.com' />
								</div>
								<div className='space-y-2'>
									<Label htmlFor='login-password'>Password</Label>
									<Input id='login-password' type='password' />
								</div>
							</form>
						</CardContent>
						<CardFooter>
							<ZButton className='w-full'>Sign In</ZButton>
						</CardFooter>
					</Card>
				</ComponentPreview>
			</section>

			{/* Form with Validation */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Form with Validation Errors</h2>
				<p className='text-muted-foreground'>Show clear error messages to help users correct their input.</p>
				<ComponentPreview
					title='Validation Example'
					description='A form showing validation error states.'
					code={`<form className="space-y-6 max-w-md">
  <div className="space-y-2">
    <Label htmlFor="username">Username</Label>
    <Input 
      id="username" 
      placeholder="Enter username"
      className="border-destructive focus-visible:ring-destructive"
    />
    <p className="text-sm text-destructive flex items-center gap-1">
      <AlertCircle className="h-4 w-4" />
      Username is already taken
    </p>
  </div>
  <div className="space-y-2">
    <Label htmlFor="valid-email">Email</Label>
    <Input id="valid-email" type="email" placeholder="Enter email" />
    <p className="text-sm text-muted-foreground">
      We'll never share your email with anyone else.
    </p>
  </div>
  <Button type="submit">Submit</Button>
</form>`}
				>
					<form className='space-y-6 max-w-md w-full'>
						<div className='space-y-2'>
							<Label htmlFor='username'>Username</Label>
							<Input
								id='username'
								placeholder='Enter username'
								defaultValue='johndoe'
								className='border-destructive focus-visible:ring-destructive'
							/>
							<p className='text-sm text-destructive flex items-center gap-1'>
								<AlertCircle className='h-4 w-4' />
								Username is already taken
							</p>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='valid-email'>Email</Label>
							<Input id='valid-email' type='email' placeholder='Enter email' />
							<p className='text-sm text-muted-foreground'>We&apos;ll never share your email with anyone else.</p>
						</div>
						<ZButton type='submit'>Submit</ZButton>
					</form>
				</ComponentPreview>
			</section>

			{/* Multi-column Form */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Multi-Column Layout</h2>
				<p className='text-muted-foreground'>Use a grid layout for forms with multiple related fields.</p>
				<ComponentPreview
					title='Registration Form'
					description='A registration form with a two-column layout.'
					code={`<form className="space-y-6 max-w-lg">
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="first-name">First Name</Label>
      <Input id="first-name" placeholder="John" />
    </div>
    <div className="space-y-2">
      <Label htmlFor="last-name">Last Name</Label>
      <Input id="last-name" placeholder="Doe" />
    </div>
  </div>
  <div className="space-y-2">
    <Label htmlFor="reg-email">Email</Label>
    <Input id="reg-email" type="email" placeholder="john@example.com" />
  </div>
  <div className="grid grid-cols-2 gap-4">
    <div className="space-y-2">
      <Label htmlFor="country">Country</Label>
      <Select>
        <SelectTrigger id="country">
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div className="space-y-2">
      <Label htmlFor="city">City</Label>
      <Input id="city" placeholder="New York" />
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label htmlFor="terms" className="text-sm font-normal">
      I agree to the terms and conditions
    </Label>
  </div>
  <Button type="submit" className="w-full">Create Account</Button>
</form>`}
				>
					<form className='space-y-6 max-w-lg w-full'>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='first-name'>First Name</Label>
								<Input id='first-name' placeholder='John' />
							</div>
							<div className='space-y-2'>
								<Label htmlFor='last-name'>Last Name</Label>
								<Input id='last-name' placeholder='Doe' />
							</div>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='reg-email'>Email</Label>
							<Input id='reg-email' type='email' placeholder='john@example.com' />
						</div>
						<div className='grid grid-cols-2 gap-4'>
							<div className='space-y-2'>
								<Label htmlFor='country'>Country</Label>
								<Select>
									<SelectTrigger id='country'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='us'>United States</SelectItem>
										<SelectItem value='uk'>United Kingdom</SelectItem>
										<SelectItem value='ca'>Canada</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<Label htmlFor='city'>City</Label>
								<Input id='city' placeholder='New York' />
							</div>
						</div>
						<div className='flex items-center space-x-2'>
							<Checkbox id='terms' />
							<Label htmlFor='terms' className='text-sm font-normal'>
								I agree to the terms and conditions
							</Label>
						</div>
						<ZButton type='submit' className='w-full'>
							Create Account
						</ZButton>
					</form>
				</ComponentPreview>
			</section>

			{/* Best Practices */}
			<section className='space-y-6'>
				<h2 className='text-2xl font-semibold tracking-tight text-foreground'>Best Practices</h2>
				<Card>
					<CardContent className='p-6 space-y-4'>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Accessibility</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Always pair inputs with visible labels using the Label component</li>
								<li>Use htmlFor on labels to associate them with inputs</li>
								<li>Include aria-describedby for error messages and help text</li>
								<li>Ensure adequate color contrast for error states</li>
							</ul>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>User Experience</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Provide clear, actionable error messages</li>
								<li>Show validation errors inline, near the relevant field</li>
								<li>Use appropriate input types (email, tel, url) for better mobile keyboards</li>
								<li>Disable submit buttons during form submission to prevent double-submits</li>
							</ul>
						</div>
						<div className='space-y-2'>
							<h3 className='font-semibold text-foreground'>Layout</h3>
							<ul className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<li>Use consistent spacing between form fields (space-y-4 or space-y-6)</li>
								<li>Group related fields together (name fields, address fields)</li>
								<li>Place primary actions at the bottom of the form</li>
								<li>Consider using cards for standalone forms</li>
							</ul>
						</div>
					</CardContent>
				</Card>
			</section>
		</div>
	)
}
