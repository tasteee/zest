'use client'

import Link from 'next/link'
import { z } from '@/components/ui'
import { ComponentPreview } from '@/components/docs/component-preview'
import { CodeBlock } from '@/components/docs/code-block'
import { ChevronRight, AlertCircle } from 'lucide-react'

export default function FormsPatternPage() {
	return (
		<z.box className='space-y-16'>
			{/* Breadcrumb */}
			<z.box className='flex items-center gap-2 text-sm text-muted-foreground'>
				<Link href='/docs' className='hover:text-foreground transition-colors'>
					Docs
				</Link>
				<ChevronRight className='h-4 w-4' />
				<Link href='/docs/patterns' className='hover:text-foreground transition-colors'>
					Patterns
				</Link>
				<ChevronRight className='h-4 w-4' />
				<z.text className='text-foreground'>Forms</z.text>
			</z.box>

			{/* Header */}
			<z.box className='space-y-4'>
				<z.box className='flex items-center gap-3'>
					<z.text.h1>Form Patterns</z.text.h1>
					<z.badge isGhost isNeutral>
						Pattern
					</z.badge>
				</z.box>
				<z.text.body className='text-xl text-muted-foreground max-w-2xl leading-relaxed'>
					Best practices for building accessible, user-friendly forms with proper validation, error handling, and layout
					patterns.
				</z.text.body>
			</z.box>

			{/* Basic Form */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Basic Form Layout</z.text.h2>
				<z.text.body className='text-muted-foreground'>A standard form with labeled inputs and a submit button.</z.text.body>
				<ComponentPreview
					title='Contact Form'
					description='A simple contact form with name, email, and message fields.'
					code={`<z.box as="form" className="space-y-6 max-w-md">
  <z.box className="space-y-2">
    <z.label htmlFor="name">Name</z.label>
    <z.input id="name" placeholder="Enter your name" />
  </z.box>
  <z.box className="space-y-2">
    <z.label htmlFor="email">Email</z.label>
    <z.input id="email" type="email" placeholder="Enter your email" />
  </z.box>
  <z.box className="space-y-2">
    <z.label htmlFor="message">Message</z.label>
    <z.input id="message" placeholder="Enter your message" />
  </z.box>
  <z.button type="submit" className="w-full">Send Message</z.button>
</z.box>`}
				>
					<z.box as='form' className='space-y-6 max-w-md w-full'>
						<z.box className='space-y-2'>
							<z.label htmlFor='name'>Name</z.label>
							<z.input id='name' placeholder='Enter your name' />
						</z.box>
						<z.box className='space-y-2'>
							<z.label htmlFor='email'>Email</z.label>
							<z.input id='email' type='email' placeholder='Enter your email' />
						</z.box>
						<z.box className='space-y-2'>
							<z.label htmlFor='message'>Message</z.label>
							<z.input id='message' placeholder='Enter your message' />
						</z.box>
						<z.button type='submit' className='w-full'>
							Send Message
						</z.button>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* Form in Card */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Form in Card</z.text.h2>
				<z.text.body className='text-muted-foreground'>Wrapping forms in cards provides visual separation and structure.</z.text.body>
				<ComponentPreview
					title='Login Form'
					description='A login form wrapped in a card component.'
					code={`<z.card className="w-full max-w-sm">
  <z.cardHeader>
    <z.cardTitle>Login</z.cardTitle>
    <z.cardDescription>
      Enter your email below to login to your account.
    </z.cardDescription>
  </z.cardHeader>
  <z.cardContent>
    <z.box as="form" className="space-y-4">
      <z.box className="space-y-2">
        <z.label htmlFor="login-email">Email</z.label>
        <z.input id="login-email" type="email" placeholder="m@example.com" />
      </z.box>
      <z.box className="space-y-2">
        <z.label htmlFor="login-password">Password</z.label>
        <z.input id="login-password" type="password" />
      </z.box>
    </z.box>
  </z.cardContent>
  <z.cardFooter>
    <z.button className="w-full">Sign In</z.button>
  </z.cardFooter>
</z.card>`}
				>
					<z.card className='w-full max-w-sm'>
						<z.cardHeader>
							<z.cardTitle>Login</z.cardTitle>
							<z.cardDescription>Enter your email below to login to your account.</z.cardDescription>
						</z.cardHeader>
						<z.cardContent>
							<z.box as='form' className='space-y-4'>
								<z.box className='space-y-2'>
									<z.label htmlFor='login-email'>Email</z.label>
									<z.input id='login-email' type='email' placeholder='m@example.com' />
								</z.box>
								<z.box className='space-y-2'>
									<z.label htmlFor='login-password'>Password</z.label>
									<z.input id='login-password' type='password' />
								</z.box>
							</z.box>
						</z.cardContent>
						<z.cardFooter>
							<z.button className='w-full'>Sign In</z.button>
						</z.cardFooter>
					</z.card>
				</ComponentPreview>
			</z.box>

			{/* Form with Validation */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Form with Validation Errors</z.text.h2>
				<z.text.body className='text-muted-foreground'>Show clear error messages to help users correct their input.</z.text.body>
				<ComponentPreview
					title='Validation Example'
					description='A form showing validation error states.'
					code={`<z.box as="form" className="space-y-6 max-w-md">
  <z.box className="space-y-2">
    <z.label htmlFor="username">Username</z.label>
    <z.input 
      id="username" 
      placeholder="Enter username"
      className="border-destructive focus-visible:ring-destructive"
    />
    <z.text.body className="text-sm text-destructive flex items-center gap-1">
      <AlertCircle className="h-4 w-4" />
      Username is already taken
    </z.text.body>
  </z.box>
  <z.box className="space-y-2">
    <z.label htmlFor="valid-email">Email</z.label>
    <z.input id="valid-email" type="email" placeholder="Enter email" />
    <z.text.body className="text-sm text-muted-foreground">
      We'll never share your email with anyone else.
    </z.text.body>
  </z.box>
  <z.button type="submit">Submit</z.button>
</z.box>`}
				>
					<z.box as='form' className='space-y-6 max-w-md w-full'>
						<z.box className='space-y-2'>
							<z.label htmlFor='username'>Username</z.label>
							<z.input
								id='username'
								placeholder='Enter username'
								defaultValue='johndoe'
								className='border-destructive focus-visible:ring-destructive'
							/>
							<z.text.body className='text-sm text-destructive flex items-center gap-1'>
								<AlertCircle className='h-4 w-4' />
								Username is already taken
							</z.text.body>
						</z.box>
						<z.box className='space-y-2'>
							<z.label htmlFor='valid-email'>Email</z.label>
							<z.input id='valid-email' type='email' placeholder='Enter email' />
							<z.text.body className='text-sm text-muted-foreground'>We&apos;ll never share your email with anyone else.</z.text.body>
						</z.box>
						<z.button type='submit'>Submit</z.button>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* Multi-column Form */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Multi-Column Layout</z.text.h2>
				<z.text.body className='text-muted-foreground'>Use a grid layout for forms with multiple related fields.</z.text.body>
				<ComponentPreview
					title='Registration Form'
					description='A registration form with a two-column layout.'
					code={`<z.box as="form" className="space-y-6 max-w-lg">
  <z.box className="grid grid-cols-2 gap-4">
    <z.box className="space-y-2">
      <z.label htmlFor="first-name">First Name</z.label>
      <z.input id="first-name" placeholder="John" />
    </z.box>
    <z.box className="space-y-2">
      <z.label htmlFor="last-name">Last Name</z.label>
      <z.input id="last-name" placeholder="Doe" />
    </z.box>
  </z.box>
  <z.box className="space-y-2">
    <z.label htmlFor="reg-email">Email</z.label>
    <z.input id="reg-email" type="email" placeholder="john@example.com" />
  </z.box>
  <z.box className="grid grid-cols-2 gap-4">
    <z.box className="space-y-2">
      <z.label htmlFor="country">Country</z.label>
      <z.select>
        <z.select.trigger id="country">
          <z.select.value placeholder="Select" />
        </z.select.trigger>
        <z.select.content>
          <z.select.item value="us">United States</z.select.item>
          <z.select.item value="uk">United Kingdom</z.select.item>
          <z.select.item value="ca">Canada</z.select.item>
        </z.select.content>
      </z.select>
    </z.box>
    <z.box className="space-y-2">
      <z.label htmlFor="city">City</z.label>
      <z.input id="city" placeholder="New York" />
    </z.box>
  </z.box>
  <z.box className="flex items-center space-x-2">
    <z.checkbox id="terms" />
    <z.label htmlFor="terms" className="text-sm font-normal">
      I agree to the terms and conditions
    </z.label>
  </z.box>
  <z.button type="submit" className="w-full">Create Account</z.button>
</z.box>`}
				>
					<z.box as='form' className='space-y-6 max-w-lg w-full'>
						<z.box className='grid grid-cols-2 gap-4'>
							<z.box className='space-y-2'>
								<z.label htmlFor='first-name'>First Name</z.label>
								<z.input id='first-name' placeholder='John' />
							</z.box>
							<z.box className='space-y-2'>
								<z.label htmlFor='last-name'>Last Name</z.label>
								<z.input id='last-name' placeholder='Doe' />
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.label htmlFor='reg-email'>Email</z.label>
							<z.input id='reg-email' type='email' placeholder='john@example.com' />
						</z.box>
						<z.box className='grid grid-cols-2 gap-4'>
							<z.box className='space-y-2'>
								<z.label htmlFor='country'>Country</z.label>
								<z.select>
									<z.select.trigger id='country'>
										<z.select.value placeholder='Select' />
									</z.select.trigger>
									<z.select.content>
										<z.select.item value='us'>United States</z.select.item>
										<z.select.item value='uk'>United Kingdom</z.select.item>
										<z.select.item value='ca'>Canada</z.select.item>
									</z.select.content>
								</z.select>
							</z.box>
							<z.box className='space-y-2'>
								<z.label htmlFor='city'>City</z.label>
								<z.input id='city' placeholder='New York' />
							</z.box>
						</z.box>
						<z.box className='flex items-center space-x-2'>
							<z.checkbox id='terms' />
							<z.label htmlFor='terms' className='text-sm font-normal'>
								I agree to the terms and conditions
							</z.label>
						</z.box>
						<z.button type='submit' className='w-full'>
							Create Account
						</z.button>
					</z.box>
				</ComponentPreview>
			</z.box>

			{/* Best Practices */}
			<z.box as='section' className='space-y-6'>
				<z.text.h2>Best Practices</z.text.h2>
				<z.card>
					<z.cardContent className='p-6 space-y-4'>
						<z.box className='space-y-2'>
							<z.text.h3>Accessibility</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Always pair inputs with visible labels using the Label component</z.box>
								<z.box as='li'>Use htmlFor on labels to associate them with inputs</z.box>
								<z.box as='li'>Include aria-describedby for error messages and help text</z.box>
								<z.box as='li'>Ensure adequate color contrast for error states</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>User Experience</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Provide clear, actionable error messages</z.box>
								<z.box as='li'>Show validation errors inline, near the relevant field</z.box>
								<z.box as='li'>Use appropriate input types (email, tel, url) for better mobile keyboards</z.box>
								<z.box as='li'>Disable submit buttons during form submission to prevent double-submits</z.box>
							</z.box>
						</z.box>
						<z.box className='space-y-2'>
							<z.text.h3>Layout</z.text.h3>
							<z.box as='ul' className='text-sm text-muted-foreground space-y-2 list-disc list-inside'>
								<z.box as='li'>Use consistent spacing between form fields (space-y-4 or space-y-6)</z.box>
								<z.box as='li'>Group related fields together (name fields, address fields)</z.box>
								<z.box as='li'>Place primary actions at the bottom of the form</z.box>
								<z.box as='li'>Consider using cards for standalone forms</z.box>
							</z.box>
						</z.box>
					</z.cardContent>
				</z.card>
			</z.box>
		</z.box>
	)
}
