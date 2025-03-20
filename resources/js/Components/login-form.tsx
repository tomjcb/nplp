import {cn} from "@/lib/utils"
import {Button} from "@/Components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/Components/ui/card"
import {Input} from "@/Components/ui/input"
import {Label} from "@/Components/ui/label"
import {useForm} from "@inertiajs/react";
import {FormEventHandler} from "react";
import InputError from "@/Components/InputError";
import {FormMessage} from "@/Components/ui/form";
import {toast} from "react-toastify";

export function LoginForm({
							  className,
							  ...props
						  }: React.ComponentPropsWithoutRef<"div">) {
	const {data, setData, post, processing, errors, reset} = useForm({
		email: '',
		password: '',
		remember: false,
	});

	const submit: FormEventHandler = (e) => {
		e.preventDefault();

		post(route('login'), {
			onFinish: () => reset('password'),
			onError: () => toast.error('Email ou mot de passe incorrect'),
		});
	};
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Se connecter</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={submit}>
						<div className="flex flex-col gap-6">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									placeholder="m@example.com"
									required
									value={data.email}
									onChange={(e) => setData('email', e.target.value)}
								/>
								<InputError message={errors.email} className="mt-2" />
							</div>
							<div className="grid gap-2">
								<div className="flex items-center">
									<Label htmlFor="password">Mot de passe</Label>
								</div>
								<Input id="password" type="password" value={data.password} required onChange={(e) => setData('password', e.target.value)}/>
							</div>
							<Button type="submit" className="w-full" disabled={processing}>
								Login
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	)
}
