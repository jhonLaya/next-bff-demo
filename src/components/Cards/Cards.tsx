interface CardsProps {
    title: string;
    description: string;
    image?: string;
}

export const Cards = ({ title, description, image }: CardsProps) => {
    return (
        <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md w-1/6 m-4">
            <div className="p-6">
                {image && <img src={image} alt={title} />}
            </div>
            <hr className="w-full border-gray-300 mt-4 mb-2" />
            <h1 className="text-lg font-bold">{title}</h1>
            <p className="text-sm text-gray-500">{description}</p>
        </div>
    );
}