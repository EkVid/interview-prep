interface StatCardProps {
    title: string;
    value: string | number;
    description: string;
    icon: React.ReactNode;
}

export default function StatCard({ title, value, description, icon }: StatCardProps) {
    return (
        <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
                <div className="p-3 rounded-full bg-indigo-100 text-indigo-600">
                    {icon}
                </div>
                <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-500">{title}</h3>
                    <p className="text-2xl font-semibold text-gray-900">{value}</p>
                    <p className="text-sm text-gray-600">{description}</p>
                </div>
            </div>
        </div>
    );
} 