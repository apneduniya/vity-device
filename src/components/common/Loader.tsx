


export default function Loader({ loading = true }) {
    return (
        <>
            {
                loading && (
                    <div className="flex justify-center items-center h-[100dvh] w-[100%] fixed top-0 left-0 bg-gray-400 bg-opacity-50 z-[99999999] backdrop-filter backdrop-blur-lg">
                        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
                    </div>
                )
            }
        </>
    );
};