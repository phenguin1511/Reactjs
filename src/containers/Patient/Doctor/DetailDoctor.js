import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import "./DetailDoctor.scss"
import HomeFooter from '../../HomePage/HomeFooter';
import * as actions from "../../../store/actions";
import { LANGUAGES } from '../../../utils';

class DetailDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPriceDetail: false,
            info_doctor: []
        }
    }


    togglePriceDetail = () => {
        this.setState({ showPriceDetail: !this.state.showPriceDetail });
    };

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            await this.props.fetchDetailInfoDoctor(id);
        }
        if (this.props.doctor) {
            this.setState({
                info_doctor: this.props.doctor
            });
        }
    }

    componentDidUpdate(prevProps) {

    }
    render() {
        console.log(this.state.info_doctor);
        const { info_doctor } = this.state;
        let { language } = this.props;
        // Kiểm tra nếu info_doctor không có dữ liệu hoặc image không tồn tại
        const doctorImage = info_doctor && info_doctor.image ? info_doctor.image : 'https://via.placeholder.com/150'; // Ảnh mặc định
        let nameVn, nameEn, specialty, fullName = '';
        if (info_doctor && info_doctor.positionData) {
            nameVn = `${info_doctor.firstName} ${info_doctor.lastName}`;
            nameEn = `${info_doctor.lastName} ${info_doctor.firstName}`;
            fullName = language === LANGUAGES.VI ? nameVn : nameEn;
            let valueEn = `${info_doctor.positionData.valueEn}`;
            let valueVn = `${info_doctor.positionData.valueVn}`;
            specialty = language === LANGUAGES.VI ? valueVn : valueEn
        }
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left">
                            <div
                                className="doctor-image"
                                style={{
                                    backgroundImage: `url(${doctorImage})`
                                }}
                            >
                            </div>
                        </div>
                        <div className="content-right">
                            <h1 className="doctor-name">{fullName}</h1>
                            <p className="doctor-specialty">Specialty: {specialty}</p>
                            <p className="doctor-description">
                                {info_doctor.Markdown && info_doctor.Markdown.description ?
                                    <span>{info_doctor.Markdown.description}</span>
                                    : 'Chưa có mô tả'
                                }
                            </p>
                        </div>
                    </div>

                    <div className="schedule-doctor">
                        <h2>Lịch Khám</h2>
                        <div className="schedule-content">
                            <div className="schedule-left">
                                <div className="calendar">
                                    <h3>Chọn ngày khám</h3>
                                    <input type="date" className="date-picker" />
                                </div>
                                <div className="daily-schedule">
                                    <h3>Lịch khám trong ngày</h3>
                                    <ul>
                                        <li>08:00 AM - 08:30 AM</li>
                                        <li>09:00 AM - 09:30 AM</li>
                                        <li>10:00 AM - 10:30 AM</li>
                                        <li>11:00 AM - 11:30 AM</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="schedule-right">
                                <div className="clinic-info">
                                    <h3>Địa chỉ khám</h3>
                                    <p>Bệnh viện Đại học Y Dược TP.HCM</p>
                                    <p>215 Hồng Bàng, Phường 11, Quận 5, TP.HCM</p>
                                </div>
                                <div className="price-info">
                                    <h3>Giá khám</h3>
                                    <p className="price" onClick={this.togglePriceDetail}>
                                        500.000đ <span className="price-detail">(Chi tiết)</span>
                                    </p>
                                    {this.state.showPriceDetail && (
                                        <div className="price-modal">
                                            <p>Chi tiết giá khám:</p>
                                            <p>Giá cơ bản: 500.000đ</p>
                                            <p>Giá thêm: 200.000đ</p>
                                            <button onClick={this.togglePriceDetail}>Đóng</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="detail-infor-doctor">
                        <h2>About the Doctor</h2>
                        <p>
                            {info_doctor.Markdown && info_doctor.Markdown.contentMarkdown ?
                                <span>{info_doctor.Markdown.contentMarkdown}</span>
                                : 'Chưa có mô tả'
                            }
                        </p>
                    </div>

                    <div className="comment-doctor">
                        <h2>Patient Reviews</h2>
                        <div className="comment">
                            <p>"Dr. Doe is an excellent physician who truly cares about his patients. Highly recommend!"</p>
                            <span>- Jane Smith</span>
                        </div>
                        <div className="comment">
                            <p>"The best cardiologist in town. Helped me recover completely after my surgery."</p>
                            <span>- Michael Brown</span>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctor: state.admin.info_doctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailInfoDoctor: (id) => dispatch(actions.fetchDetailInfoDoctor(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);