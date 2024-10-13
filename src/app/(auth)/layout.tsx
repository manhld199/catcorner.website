import { Josefin_Sans } from "next/font/google";

const josefin_Sans = Josefin_Sans({
	weight: "400",
	subsets: ["vietnamese"],
});

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className={`w-[60%] mx-auto m-8 ${josefin_Sans.className}`}>
			{children}
		</section>
	);
}
