import PropTypes from 'prop-types';

const Bento = ({ content, size, height }) => {
  return (
    <div
      className="bg-white p-[20px] flex  justify-center rounded-lg phone:w-[95%] tablet:w-[90%] shadow-md hover:shadow-xl"
      style={{ width: `${size}%`, height: `${height}vh` }}
    >
      {content}
    </div>
  );
};

export default Bento;

Bento.propTypes = {
  content: PropTypes.node, // Changed from object to node to accept any renderable content
 
};
