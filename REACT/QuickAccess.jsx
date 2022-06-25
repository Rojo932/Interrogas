import React from "react"
import { Row, Col, Card } from "react-bootstrap"
import PropTypes from 'prop-types'

const QuickAccess = () => {
  const quickAccessFiles = [
      {
        icon: 'mdi mdi-folder-image font-16',
        name: 'Image',
        value: 1
      },
      {
        icon: 'mdi mdi-file-pdf-box font-16',
        name: 'PDF',
        value: 2
      },
      {
          icon: 'mdi mdi-library font-16',
          name: 'Text',
          value: 3
      },
      {
        icon: 'mdi mdi-folder font-16',
        name: 'PNG',
        value: 4
      },
      {
        icon: 'mdi mdi-folder font-16',
        name: 'JPG',
        value: 5
      },
  ];

  return (
    <>
      <div className="mt-2">
        <h5 className="mb-2">Quick Access</h5>
        <Row className="mx-n1 justify-content-center">
          {quickAccessFiles.map((f, i) => {
            return (
              <Col key={i} xxl={2} lg={5}>
                <Card className="m-1 shadow-none border">
                  <div className="p-2">
                    <Row>
                      <Col className="col-auto">
                        <div className="avatar-sm">
                          <span className="avatar-title bg-light text-secondary rounded">
                            <i className={f.icon}></i>
                          </span>
                        </div>
                      </Col>
                      <Col className="m-auto">
                        <span className="text-muted fw-bold">
                          {f.name}
                        </span>
                      </Col>
                    </Row>
                  </div>
                </Card>
              </Col>
            )
          })}
        </Row>
      </div>
    </>
  )
}

QuickAccess.propTypes = {
  arrayData: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
  }))
};
QuickAccess.defaultProps = {
  arrayData: [],
};

export default React.memo(QuickAccess)